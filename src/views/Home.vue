<template>
  <div style="display:contents;">
    <div
      v-if="!user"
      class="container-fluid homepageHeaderSection bgLightBlue pt-md-5 pb-md-4 pt-5 pb-0"
    >
      <div
        class="row py-md-5 py-0 shadow shadow-sm bg-light text-md-left text-center"
      >
        <div class="col-md-5 my-auto px-md-5 p-3 pb-md-5">
          <h1 class="textBlue appTitle pl-md-5 px-3">
            <span class="d-md-block d-none">Welcome to</span> Natai.com
          </h1>
          <h3 class="pl-md-5 px-3">A place to showcase your talent</h3>
          <p class="lead pl-md-5 p-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
            rerum excepturi quae explicabo eligendi itaque, sit non voluptate
            aliquam aut.
          </p>
          <div class="ml-md-5 mx-auto z-top">
            <router-link tag="button" to="/signup" class="btn btn-primary px-4"
              >Sign Up</router-link
            >
            <router-link
              tag="button"
              to="/login"
              class="btn btn-primary ml-md-3 px-4"
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
            <div class="container pt-3 mb-4">
              <h2 class="text-center font-weight-light pb-3">
                <i class="fas fa-crown"></i> Article of the month
              </h2>
              <div class="card w-100 shadow shadow-sm mb-2">
                <img
                  class="card-img-top"
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20(126).jpg"
                  alt="Article image"
                />
                <div class="card-body p-3">
                  <h4 class>Lorem ipsum dolor sit amet</h4>
                  <hr />
                  <p class="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem molestiae voluptatibus, libero numquam vel
                    nobis dicta omnis! Repellat itaque ullam iure deleniti,
                    fugiat assumenda culpa sequi laborum nam minima modi
                    sapiente doloribus voluptatem eveniet enim quia. Deleniti
                    fuga alias exercitationem quam sapiente consequuntur
                    perspiciatis sunt libero vitae, dolorem ab quis, quo minima
                    placeat? Amet praesentium sint cumque quos laboriosam
                    distinctio? ...
                  </p>
                  <div class="row">
                    <div class="col-6">
                      <h6>27/04/2020</h6>
                      <h6>
                        <span class="font-weight-light">by</span> Tanvir Mahin
                      </h6>
                    </div>
                    <div
                      class="col-6 d-flex justify-content-end align-items-end"
                    >
                      <a href="#" class="h6 textBlue">
                        READ MORE
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!--All Article-->
              <h2 class="text-center font-weight-light py-3">
                <i class="fas fa-newspaper"></i> Articles
              </h2>
              <div class="container">
                <div class="row">
                  <!--All post single item-->
                  <div
                    v-for="post in posts"
                    :key="post.id"
                    class="col-md-6 mb-4"
                  >
                    <div
                      class="card text-left singleCardAllPost shadow shadow-sm"
                    >
                      <div class="view overlay">
                        <a href="#">
                          <img :src="post.preview" class="card-img-top" alt />
                        </a>
                      </div>
                      <div class="card-body mx-4">
                        <a
                          href
                          class="textBlue text-center text-uppercase font-small"
                        ></a>
                        <h6 class="mb-3 mt-3">
                          <a
                            href
                            class="teal-text text-center text-uppercase font-small"
                          >
                            <strong>{{ post.category }}</strong>
                          </a>
                          <a class="text-secondary font-small"
                            >- {{ timeSince(post.created.toDate()) }}</a
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
              </div>
              <!--All Article END-->
            </div>
          </div>
          <div class="col-md-4">
            <!--Popular posts-->
            <section class="section shadow shadow-sm my-3">
              <div class="card card-body pb-0">
                <p class="font-weight-bold text-center bg-light py-2 mb-4">
                  <strong>POPULAR POSTS</strong>
                </p>
                <!--Single populer post-->
                <div class="single-post">
                  <div class="row p-2">
                    <div class="col-5">
                      <a href="#">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Others/photo13.jpg"
                          class="img-fluid rounded"
                          alt="Post image"
                        />
                      </a>
                    </div>
                    <div class="col-7">
                      <h6 class="mt-0 text-small">
                        <a href="#" class="titlePopulerPost"
                          >Title of the news</a
                        >
                      </h6>
                      <div class>
                        <p class="text-small text-secondary mb-0">
                          <i
                            class="fas fa-clock font-weight-lighter textBlue50"
                          ></i>
                          18/08/2017
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </section>
            <!--Popular posts END-->
            <!--Categories-->
            <div class="card card-body pb-0 shadow shadow-sm">
              <div>
                <p class="font-weight-bold text-center bg-light py-2 mb-4">
                  <strong>CATEGORIES</strong>
                </p>
                <ul class="list-group my-4">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <a href="#" class="textBlue">
                      <p class="mb-0">Travel</p>
                    </a>
                    <span class="badge badge-pill badge-primary font-small"
                      >4</span
                    >
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
                  >Mey 2020</a
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
import { Post } from "@/models";
import * as moment from "moment";

export default Vue.extend({
  name: "Home",
  components: {},
  data: () => ({
    posts: [] as Post[]
  }),
  computed: {
    user() {
      return auth.currentUser;
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    timeSince(time: Date) {
      return (moment as any)(time).fromNow();
    },
    fetchPosts: async function() {
      try {
        const ref = db.collection("posts").where("active", "==", true);
        ref.onSnapshot(QuerySnapshot => {
          const posts: Post[] = [];
          QuerySnapshot.forEach(doc =>
            posts.push({ id: doc.id, ...(doc.data() as Post) })
          );
          this.posts = posts;
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
});
</script>
