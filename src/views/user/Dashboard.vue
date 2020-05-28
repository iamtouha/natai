<template>
  <main class="bgLightBlue">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mt-3">
          <div class="container mt-4 mb-4">
            <div class="w-100 mb-2 text-center">
              <button class="btn btn-lg btn-primary shadow shadow-sm">
                <i class="fas fa-pen pr-2"></i> Write New Article
              </button>
            </div>
            <hr class="w-75 mx-auto" />
            <!--All Article-->
            <h2 class="text-center font-weight-light py-3">
              <i class="fas fa-newspaper pr-3"></i>Your Articles
            </h2>
            <div class="container">
              <div v-if="myPosts.length" class="row">
                <!--All post single item-->
                <div
                  v-for="post in myPosts"
                  :key="post.id"
                  class="col-md-6 mb-4"
                >
                  <div
                    class="card text-left singleCardAllPost shadow shadow-sm"
                  >
                    <div class>
                      <a href="#">
                        <img :src="post.preview" class="card-img-top" alt />
                      </a>
                      <div class="pr-4 pt-4 text-right">
                        <a
                          class="dropdown-toggle"
                          href="#"
                          id="optionDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="fas fa-cog"></i>
                        </a>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="optionDropdown"
                        >
                          <a
                            class="dropdown-item cursor-pointer"
                            @click="editPost(post)"
                            >Edit</a
                          >
                          <a
                            class="dropdown-item cursor-pointer"
                            @click="hidePost(post)"
                            >{{ post.active ? "Unpublish" : "Publish" }}</a
                          >
                          <a
                            class="dropdown-item text-danger cursor-pointer"
                            @click="dltPost(post)"
                          >
                            <strong>Delete</strong>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="card-body mt-0 pt-0 mx-4">
                      <h6 class="mb-3">
                        <a
                          href
                          class="teal-text text-center text-uppercase font-small"
                        >
                          <strong>{{ post.category }}</strong>
                        </a>
                        <a class="text-secondary font-small"
                          >- {{ post.created.toDate().toDateString() }}</a
                        >
                      </h6>
                      <h4 class="card-title">
                        <strong>{{ post.title }}</strong>
                      </h4>
                      <hr />
                      <p class="text-secondary mb-4">
                        {{ post.body.substr(0, 120) }}
                      </p>

                      <p
                        class="text-right mb-0 text-uppercase font-small spacing font-weight-bold"
                      >
                        <a href="#" class="textBlue">
                          read more
                          <i
                            class="fas fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <!--All post single item END-->
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
            <div class="shadow shadow-sm">
              <img src="/img/mahin.jpg" alt="profile image" class="img-fluid" />
            </div>
            <div class="card-body">
              <!-- Title -->
              <h4 class="card-title">
                <strong>{{ user.displayName }}</strong>
              </h4>
              <p class="h6">
                <i class="fas fa-graduation-cap"></i> Student at
                <strong href>RUET</strong>
              </p>
              <p class="h6">
                <i class="fas fa-map-marker-alt"></i> Vodra, Rajshahi
              </p>

              <!-- Social -->
              <div class="social text-light d-flex justify-content-center mt-3">
                <a type="button" class="btn-floating btn-lg">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a type="button" class="btn-floating btn-lg">
                  <i class="fab fa-twitter"></i>
                </a>
                <a type="button" class="btn-floating btn-lg">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>

              <!-- Text -->
              <p class="card-text mt-3">
                {Bio} Some quick example text to build on the card title and
                make up the bulk of the card's content.
              </p>

              <a href="#" class="btn btn-primary px-3">
                <i class="fas fa-user-cog mr-2"></i>Edit Profile
              </a>
            </div>
          </section>

          <!--Popular posts-->
          <section class="section shadow shadow-sm my-3">
            <div class="card card-body pb-0">
              <p class="font-weight-bold text-center bg-light py-2 mb-4">
                <strong>YOUR POPULAR POSTS</strong>
              </p>
              <!--Single populer post-->
              <template v-for="post in popularPosts">
                <div :key="post.id" class="single-post">
                  <div class="row p-2">
                    <div class="col-5">
                      <a href="#">
                        <img
                          :src="post.preview"
                          class="img-fluid rounded"
                          alt="Post image"
                        />
                      </a>
                    </div>
                    <div class="col-7">
                      <h6 class="mt-0 text-small">
                        <a href="#" class="titlePopulerPost">{{
                          post.title
                        }}</a>
                      </h6>
                      <div class>
                        <p class="text-small text-secondary mb-0">
                          <i
                            class="fas fa-clock font-weight-lighter textBlue50"
                          ></i>
                          {{ post.created.toDate().toDateString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr :key="post.id + 1" />
              </template>
              <!--Single populer post END-->
            </div>
          </section>
          <!--Popular posts END-->
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { auth, db } from "@/Firebase";
import { Post } from "@/models";

export default Vue.extend({
  data: () => ({
    myPosts: [] as Post[],
    query: (null as unknown) as Function
  }),
  computed: {
    user() {
      return auth.currentUser;
    },
    popularPosts() {
      const posts = [...this.myPosts];
      const sorted = posts.sort((a, b) => {
        return (a.shares as number) - (b.shares as number);
      });
      return sorted.slice(0, 6);
    }
  },
  methods: {
    editPost: async function(post: Post) {
      console.log(post.title);
    },
    hidePost: async function(post: Post) {
      try {
        await db
          .collection("posts")
          .doc(post.id)
          .update({
            active: !post.active
          });
      } catch (error) {
        alert(error.message);
      }
    },
    userPosts: async function() {
      const query = db
        .collection("posts")
        .where("user_id", "==", this.user?.uid);
      this.query = query.onSnapshot(querySnapshot => {
        const posts: Post[] = [];
        querySnapshot.forEach(doc => {
          posts.push({ id: doc.id, ...(doc.data() as Post) });
        });
        this.myPosts = posts;
      });
    }
  },
  created() {
    this.userPosts();
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
