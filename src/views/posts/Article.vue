<template>
  <div class="d-block py-5 bgLightBlue">
    <section class="container bg-white card card-body shadow shadow-sm">
      <div class="col-lg-12">
        <div
          class="mb-5"
          style="width: 100%; max-height: 250px; overflow: hidden;"
        >
          <img
            v-if="!loading"
            :src="article.cover || '/img/article_cover.jpg'"
            alt="Image"
            class="img-fluid w-100"
          />
        </div>
        <h1 class="mb-4">{{ article.title }}</h1>
        <div class="d-flex mb-5">
          <div class="mr-3">
            <img
              :src="article.user.photoURL || '/img/nophoto.svg'"
              alt="Image"
              class="img-fluid rounded shadow shadow-sm"
              style="max-width: 60px;"
            />
          </div>
          <div class="vcard">
            <span class="d-block">
              <router-link
                :to="'/users/' + article.user.uid"
                class="text-dark font-weight-bold"
                >{{ article.user.displayName }}</router-link
              >
              {{ article.title ? "in" : "" }}
              <a href="#" class="text-dark font-weight-bold">
                {{ `${article.category}` }}
              </a>
            </span>
            <span v-if="article.created" class="date-read">
              {{ toDateString(article.created.toDate()) }}
              <span class="icon-star2"></span>
            </span>
          </div>
        </div>
        <div class="ql-editor" v-html="body"></div>
        <div class="pt-5">
          <p>
            <a v-for="tag in article.tags" :key="tag" class="mx-1" href="#"
              >#{{ tag }}</a
            >
          </p>
        </div>
        <hr />
        <!--All comment-->
        <div class="pt-5">
          <div class="section-title">
            <h2 class="mb-5">{{ article.comments.length }} Comment(s)</h2>
          </div>
          <!--Comment-->
          <div
            v-if="article.comments.length"
            class="container my-3 px-0 px-md-5"
          >
            <div v-for="(com, i) in article.comments" :key="i" class="row my-2">
              <div class="col-md-1 col-2 p-0 m-auto">
                <b-img-lazy
                  rounded="circle"
                  v-bind="{
                    blank: true,
                    blankColor: '#777',
                    width: 75,
                    height: 75,
                    class: 'm1'
                  }"
                  :src="com.user.photoURL || '/img/nophoto.svg'"
                  :alt="article.user.name"
                ></b-img-lazy>
              </div>
              <div class="col-md-10 col-9 py-1 card card-body bg-light">
                <p class="py-1 mb-1">{{ com.text }}</p>
                <hr class="my-1" />
                <router-link
                  :to="'/users/' + com.user.uid"
                  tag="a"
                  class="p font-weight-bold mb-0 text-primary"
                  >{{ com.user.displayName }}</router-link
                >
                <div class="row">
                  <div class="col py-0">
                    <small class="pb-2">{{
                      timeSince(com.time.toDate())
                    }}</small>
                    <small
                      v-if="user && user.uid === com.user.uid"
                      @click="deleteComment(com.id)"
                      style="cursor:pointer;"
                      class="pb-2 pl-3 text-primary"
                      >Delete comment</small
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Comment END-->

          <!--All Comment END-->

          <div
            v-if="user"
            class="card card-body shadow shadow-sm bg-light mt-5"
          >
            <form @submit.prevent class>
              <div class="form-group">
                <h2 class="mb-4">Leave a comment</h2>
                <textarea
                  v-model="comment.text"
                  id="message"
                  cols="30"
                  rows="8"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form-group">
                <b-btn
                  @click="addComment"
                  class="py-3"
                  variant="primary"
                  :disabled="!comment.text.length || commentLoading"
                >
                  {{ commentLoading ? "Adding" : "Comment" }}
                  <i v-if="commentLoading" class="fas fa-spinner"></i>
                </b-btn>
              </div>
            </form>
          </div>
          <div v-else class="w-100 text-center">
            <b-button size="large" variant="primary" to="/login"
              >login to comment</b-button
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import moment from "moment";
import firebase, { db, storage, functions, auth } from "@/Firebase";
import { Article, Comment } from "@/models";
import axios from "axios";
import "quill/dist/quill.core.css"; // import styles

@Component
export default class ClassName extends Vue {
  loading = false;
  commentLoading = false;
  article = {
    user: {},
    comments: [] as Comment[]
  } as Article;
  comment: Comment = {
    text: "",
    user: this.$store.getters,
    time: firebase.firestore.FieldValue.serverTimestamp()
  };
  body = "";
  docSnapshot!: firebase.Unsubscribe;

  //   computed
  get id(): string {
    return this.$route.params.id;
  }
  get url() {
    return window.location.href;
  }
  get user() {
    return auth.currentUser;
  }

  @Watch("article.body")
  getBody(val: string) {
    this.loading = false;
    axios
      .get(val, { responseType: "blob" })
      .then(resp => {
        const reader = new FileReader();
        reader.addEventListener("loadend", e => {
          const result = (e as any).currentTarget.result;
          this.body = result;
        });
        reader.readAsText(resp.data);
      })
      .catch(err => alert(err.message));
  }
  //   hooks
  created() {
    this.fetchArticle();
  }
  beforeDestroy() {
    this.docSnapshot();
  }
  //   methods
  toDateString(date: Date) {
    return moment(date).format("LLLL");
  }
  timeSince(date: Date) {
    return moment(date).fromNow();
  }
  async addComment() {
    this.commentLoading = true;
    try {
      const addComment = functions.httpsCallable("addComment");
      await addComment({ id: this.id, comment: this.comment.text });
    } catch (error) {
      alert(error.message);
    }
    this.comment.text = "";
    this.commentLoading = false;
  }
  async deleteComment(comment: string) {
    try {
      const deleteComment = functions.httpsCallable("deleteComment");
      await deleteComment({ article: this.id, comment });
    } catch (error) {
      alert(error.message);
    }
  }
  fetchArticle() {
    this.loading = true;
    this.docSnapshot = db.doc("articles/" + this.id).onSnapshot(
      doc => {
        if (!doc.exists) this.$router.push("/");
        else {
          this.article = { id: doc.id, ...(doc.data() as Article) };
        }
      },
      error => alert(error.message)
    );
  }
}
</script>
<style lang="scss"></style>
