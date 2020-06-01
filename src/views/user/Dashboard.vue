<template>
  <main class="bgLightBlue">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mt-3">
          <div class="container mt-4 mb-4">
            <div class="w-100 mb-2 text-center">
              <router-link
                tag="button"
                to="/new-article"
                class="btn btn-lg btn-primary shadow shadow-sm"
              >
                <i class="fas fa-pen pr-2"></i> Write New Article
              </router-link>
            </div>
            <hr class="w-75 mx-auto" />
            <!--All Article-->
            <h2 class="text-center font-weight-light py-3">
              <i class="fas fa-newspaper pr-3"></i>Your Articles
            </h2>
            <div class="container">
              <div v-if="myArticles.length" class="row">
                <!--All article single item-->
                <div
                  v-for="article in myArticles"
                  :key="article.id"
                  class="col-md-6 mb-4"
                >
                  <div
                    class="card text-left singleCardAllArticle shadow shadow-sm"
                  >
                    <div class>
                      <a href="#">
                        <img
                          :src="
                            article.cover
                              ? article.cover
                              : '/img/article_cover.jpg'
                          "
                          class="card-img-top"
                          alt
                        />
                      </a>
                      <div class="pt-4 text-right">
                        <b-dropdown
                          id="dropdown-left"
                          text="Left align"
                          variant="light"
                          class="m-2"
                        >
                          <template v-slot:button-content>
                            <i class="fas fa-cog"></i>
                          </template>
                          <b-dropdown-item :to="'/edit/' + article.id"
                            >Edit Article</b-dropdown-item
                          >
                          <b-dropdown-item @click="hideArticle(article)">
                            {{ article.active ? "Unpublish" : "Publish" }}
                          </b-dropdown-item>
                          <b-dropdown-item @click="dltArticle(article)">
                            <strong class="text-danger">Delete</strong>
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>
                    <div class="card-body mt-0 pt-0">
                      <h6 class="mb-3">
                        <a
                          href
                          class="teal-text text-center text-uppercase font-small"
                        >
                          <strong>{{ article.category }}</strong>
                        </a>
                        <a class="text-secondary font-small"
                          >- {{ article.created.toDate().toDateString() }}</a
                        >
                      </h6>
                      <h4 class="card-title">
                        <strong>{{ article.title }}</strong>
                      </h4>
                      <hr />
                      <p class="text-secondary mb-4">{{ article.preview }}</p>

                      <p
                        class="text-right mb-0 text-uppercase font-small spacing font-weight-bold"
                      >
                        <router-link
                          :to="'/article/' + article.id"
                          tag="a"
                          class="textBlue"
                        >
                          read more
                          <i
                            class="fas fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
                <!--All article single item END-->
              </div>
              <div v-else class="row">
                <p class="text-center w-100">No Articles</p>
              </div>
              <!--All Article END-->
            </div>
          </div>
        </div>
        <!--Right Side Column-->
        <div class="col-md-4">
          <!--Profile details-->
          <section
            class="profileSectionRight card mb-4 text-center shadow shadow-sm mt-3"
          >
            <b-modal hide-footer style="width:700px;" id="editProfile">
              <template v-slot:modal-title>
                <h3 class="font-weight-lighter textBlue">Personal Info</h3>
              </template>
              <UpdateProfile />
            </b-modal>
            <div :class="[user.photoURL ? 'shadow shadow-sm' : '']">
              <img
                :src="user.photoURL ? user.photoURL : '/img/nophoto.svg'"
                alt="profile image"
                class="img-fluid"
              />
            </div>
            <div class="card-body">
              <!-- Title -->
              <h4 class="card-title">
                <strong>{{ user.displayName }}</strong>
              </h4>
              <p class="h6">
                <i class="fas fa-graduation-cap"></i> From
                <strong href>{{ user.institute }}</strong>
              </p>
              <!-- Text -->
              <p class="card-text mt-3">{{ user.about }}</p>
              <b-btn
                @click="$bvModal.show('editProfile')"
                class="px-3"
                variant="primary"
              >
                <i class="fas fa-user-cog mr-2"></i>Edit Profile
              </b-btn>
            </div>
          </section>

          <!--Popular articles-->
          <section class="section shadow shadow-sm my-3">
            <div class="card card-body pb-0">
              <p class="font-weight-bold text-center bg-light py-2 mb-4">
                <strong>YOUR POPULAR ARTICLES</strong>
              </p>
              <!--Single populer article-->
              <template v-for="article in popularArticles">
                <div :key="article.id" class="single-article">
                  <router-link
                    tag="a"
                    :to="'/article/' + article.id"
                    class="row p-2"
                  >
                    <div class="col-5">
                      <a href="#">
                        <img
                          :src="
                            article.cover
                              ? article.cover
                              : '/img/article_cover.jpg'
                          "
                          class="img-fluid rounded"
                          alt="Article image"
                        />
                      </a>
                    </div>
                    <div class="col-7">
                      <h6 class="mt-0 text-small">
                        <a href="#" class="titlePopulerArticle">
                          {{ article.title }}
                        </a>
                      </h6>
                      <div class>
                        <p class="text-small text-secondary mb-0">
                          <i
                            class="fas fa-clock font-weight-lighter textBlue50"
                          ></i>
                          {{ article.created.toDate().toDateString() }}
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <hr :key="article.id + 1" />
              </template>
              <!--Single populer article END-->
            </div>
          </section>
          <!--Popular articles END-->
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { auth, db } from "@/Firebase";
import { Article, Profile } from "@/models";
import UpdateProfile from "@/components/UpdateProfileModal.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  components: { UpdateProfile },
  data: () => ({
    loading: false,
    myArticles: [] as Article[],
    query: (null as unknown) as Function
  }),
  computed: {
    user(): Profile {
      return this.$store.getters.profile;
    },
    popularArticles() {
      const articles = [...this.myArticles];
      const sorted = articles.sort((a: any, b: any) => {
        return b.comments?.length - a.comments?.length;
      });
      return sorted.slice(0, 6);
    }
  },
  methods: {
    editArticle: async function(article: Article) {
      console.log(article.title);
    },
    hideArticle: async function(article: Article) {
      try {
        await db
          .collection("articles")
          .doc(article.id)
          .update({
            active: !article.active
          });
      } catch (error) {
        alert(error.message);
      }
    },
    dltArticle: async function(item: Article) {
      try {
        if (confirm(`Delete article: "${item.title}"?`))
          await db
            .collection("articles")
            .doc(item.id)
            .delete();
      } catch (error) {
        alert(error.message);
      }
    },
    userArticles: async function() {
      const query = db
        .collection("articles")
        .where("user.uid", "==", this.user?.uid);
      this.query = query.onSnapshot(querySnapshot => {
        const articles: Article[] = [];
        querySnapshot.forEach(doc => {
          articles.push({ id: doc.id, ...(doc.data() as Article) });
        });
        this.myArticles = articles;
      });
    }
  },
  created() {
    this.userArticles();
  },
  beforeDestroy() {
    this.query();
  }
});
</script>
<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
