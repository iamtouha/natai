<template>
  <div style="display:contents;">
    <div
      v-if="!user"
      class="container-fluid homepageHeaderSection bgLightBlue pb-md-4 pb-0"
    >
      <div
        class="row py-md-3 py-0 shadow shadow-sm bg-light text-md-left text-center"
      >
        <div class="col-md-5 my-auto px-md-5 p-3 pb-md-5">
          <img src="../assets/NataiLogo.png" alt class="w-25 ml-md-5 mx-3" />
          <h1 class="textBlue appTitle pl-md-5 px-3">
            <span class="d-md-block d-none">Welcome to</span> Natai.com
          </h1>
          <h3 class="pl-md-5 px-3">A place to showcase your talent</h3>

          <p class="lead pl-md-5 p-3">
            Natai, is a Bangladeshi youth organization with the sole purpose to
            provide students a common platform for showcasing their creative
            skills.
          </p>

          <div class="ml-md-5 mx-auto z-top">
            <router-link tag="button" to="/signup" class="btn btn-primary px-4"
              >Sign Up</router-link
            >
            <router-link
              tag="button"
              to="/login"
              class="btn btn-primary ml-md-3 ml-1 px-4"
              >Login Now</router-link
            >
          </div>
        </div>
        <div class="col-md-7 h-100 headerImg">
          <img
            src="/img/landingpageMainImage.png"
            alt="landing image"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
    <main class="bgLightBlue pt-3">
      <div class="container">
        <div class="row">
          <div class="col-md-8 pt-1">
            <div v-if="topArticle.title" class="container pt-3 mb-4">
              <h2 class="text-center font-weight-light pb-3">
                <i class="fas fa-crown"></i> Article of the month
              </h2>
              <div class="card w-100 shadow shadow-sm mb-2">
                <img
                  class="card-img-top"
                  :src="
                    topArticle.cover
                      ? topArticle.cover
                      : '/img/article_cover.jpg'
                  "
                  alt="Article image"
                />
                <div class="card-body p-3">
                  <h4 class>{{ topArticle.title }}</h4>
                  <hr />
                  <p class="card-text">{{ topArticle.preview }}</p>
                  <div class="row">
                    <div class="col-6">
                      <h6>{{ timeSince(topArticle.created.toDate()) }}</h6>
                      <router-link
                        tag="a"
                        style="text-decoration:none;"
                        class="h6 text-dark"
                        :to="'/users/' + topArticle.user.uid"
                      >
                        <span class="font-weight-light">by</span>
                        {{ topArticle.user.displayName }}
                      </router-link>
                    </div>
                    <div
                      class="col-6 d-flex justify-content-end align-items-end"
                    >
                      <router-link
                        :to="'/article/' + topArticle.id"
                        class="h6 textBlue"
                      >
                        READ MORE
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!--All Article-->
              <h2 class="text-center font-weight-light py-3">
                <i class="fas fa-newspaper"></i> Articles
              </h2>
              <div class="container">
                <div class="row card-columns">
                  <!--All article single item-->
                  <div
                    v-for="article in articles"
                    :key="article.id"
                    class="col-md-6 mb-4"
                  >
                    <div
                      class="fill-height card text-left singleCardAllArticle shadow shadow-sm"
                    >
                      <div class="view overlay">
                        <a href="#">
                          <b-img
                            class="card-img-top"
                            :src="article.cover || '/img/article_cover.jpg'"
                          ></b-img>
                        </a>
                      </div>
                      <div class="card-body">
                        <a
                          href
                          class="textBlue text-center text-uppercase font-small"
                        ></a>
                        <h6 class="mb-3 mt-3">
                          <a
                            href
                            class="teal-text text-center text-uppercase font-small"
                          >
                            <strong>{{ article.category }}</strong>
                          </a>
                          <a class="text-secondary font-small"
                            >- {{ timeSince(article.created.toDate()) }}</a
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
              </div>
              <!--All Article END-->
            </div>
          </div>
          <div class="col-md-4">
            <!-- Create Article -->
            <div v-if="user" class="p-4 text-center">
              <router-link
                tag="button"
                to="/new-article"
                class="btn btn-lg btn-primary shadow shadow-sm"
              >
                <i class="fas fa-pen pr-2"></i> Write New Article
              </router-link>
            </div>

            <!--Popular articles-->
            <section class="section shadow shadow-sm my-3">
              <div class="card card-body pb-0">
                <p class="font-weight-bold text-center bg-light py-2 mb-4">
                  <strong>POPULAR POSTS</strong>
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
                          <b-img-lazy
                            class="card-img-top"
                            :src="article.cover || '/img/article_cover.jpg'"
                          ></b-img-lazy>
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
              </div>
            </section>
            <!--Popular articles END-->
            <!--Categories-->
            <div class="card card-body pb-0 shadow shadow-sm">
              <div>
                <p class="font-weight-bold text-center bg-light py-2 mb-4">
                  <strong>CATEGORIES</strong>
                </p>
                <ul class="list-group my-4">
                  <li
                    v-for="cat in categories"
                    :key="cat.name"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <a href="#" class="textBlue">
                      <p class="mb-0">{{ cat.name }}</p>
                    </a>
                    <span class="badge badge-pill badge-primary font-small">{{
                      cat.items
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--Categories END-->

            <!--Archive-->
            <div class="card card-body mt-4 shadow shadow-sm">
              <p class="font-weight-bold text-center bg-light py-2 mb-4">
                <strong>ARCHIVE</strong>
              </p>
              <div class="list-group text-center">
                <a href="#" class="list-group-item list-group-item-action"
                  >May 2020</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >April 2020</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >March 2020</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >February 2020</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >January 2020</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >December 2019</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >November 2019</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >October 2019</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >September 2019</a
                >
              </div>
            </div>
            <!--Archive END-->
            <!--Contact-->
            <div
              class="container-fluid contact-form-custom my-3 shadow shadow-sm"
            >
              <form>
                <p class="font-weight-bold text-center bg-light py-2 mb-4">
                  <strong>CONTACT</strong>
                </p>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        type="text"
                        name="txtName"
                        class="form-control"
                        placeholder="Your Name *"
                        value
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="txtEmail"
                        class="form-control"
                        placeholder="Your Email *"
                        value
                        required
                      />
                    </div>
                    <textarea
                      name="txtMsg"
                      class="form-control"
                      placeholder="Your Message *"
                      style="width: 100%;"
                    ></textarea>
                    <div class="form-group mt-3">
                      <input
                        type="submit"
                        name="btnSubmit"
                        class="btnContact"
                        value="Send Message"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!--Contact END-->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { auth, db } from "@/Firebase";
import { Article } from "@/models";
import moment from "moment";

export default Vue.extend({
  name: "Home",
  components: {},
  data: () => ({
    articles: [] as Article[],
    query: (null as unknown) as Function
  }),
  computed: {
    user() {
      return auth.currentUser;
    },
    categories() {
      interface Category {
        name: string;
        items: number;
      }
      return this.articles.reduce((acc, crr) => {
        const includes = acc.find(cat => cat.name === crr.category);
        if (!includes) {
          acc.push({ name: crr.category, items: 1 });
        } else includes.items++;
        return acc;
      }, [] as Category[]);
    },
    popularArticles() {
      const articles = [...this.articles];
      const sorted = articles.sort((a: any, b: any) => {
        return b.comments?.length - a.comments?.length;
      });
      return sorted.slice(0, 6);
    },
    topArticle() {
      return (this as any).popularArticles[0] || {};
    }
  },
  created() {
    this.fetchArticles();
  },
  beforeDestroy() {
    this.query();
  },

  methods: {
    timeSince(time: Date) {
      return moment(time).fromNow();
    },
    fetchArticles: async function() {
      try {
        const time = moment().subtract(1, "month");
        const ref = db
          .collection("articles")
          .where("created", ">=", time.toDate())
          .where("active", "==", true);
        this.query = ref.onSnapshot(QuerySnapshot => {
          const articles: Article[] = [];
          QuerySnapshot.forEach(doc =>
            articles.push({ id: doc.id, ...(doc.data() as Article) })
          );
          this.articles = articles;
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
});
</script>
