<template>
  <main class="bgLightBlue py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="container mb-4">
            <!--All Article-->
            <h2 class="text-center font-weight-light py-3">
              <i class="fas fa-newspaper pr-3"></i>
              {{ user.displayName }}'s Articles
            </h2>
            <div class="container">
              <div class="row">
                <!--All post single item-->
                <div
                  v-for="article in articles"
                  :key="article.id"
                  class="col-md-6 mb-4"
                >
                  <div
                    class="card full-height text-left singleCardAllPost shadow shadow-sm"
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
                <i class="fas fa-graduation-cap"></i> from
                <strong href>{{ user.institute }}</strong>
              </p>
              <!-- Text -->
              <p class="card-text mt-3">{{ user.about }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Article, Profile } from "@/models";
import { db, auth } from "@/Firebase";
@Component
export default class User extends Vue {
  articles: Article[] = [];
  user = {} as Profile;
  get uid() {
    return this.$route.params.id;
  }
  created() {
    if (auth.currentUser) {
      if (auth.currentUser.uid === this.uid) this.$router.push("/dashboard");
      else {
        this.fetchProfile();
        this.fetchArticles();
      }
    }
  }
  async fetchProfile() {
    try {
      const doc = await db.doc("users/" + this.uid).get();
      if (doc.exists) {
        this.user = doc.data() as Profile;
      } else {
        this.$router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  }
  async fetchArticles() {
    try {
      const QS = await db
        .collection("articles")
        .where("user.uid", "==", this.uid)
        .where("active", "==", true)
        .get();
      QS.forEach(doc => {
        this.articles.push({
          id: doc.id,
          ...(doc.data() as Article)
        });
      });
    } catch (error) {
      alert(error.message);
    }
  }
}
</script>
