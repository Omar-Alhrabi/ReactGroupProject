@extends('layouts.app')

@section('title', 'Welcome to ChefCraft')

@section('body-class', '')

@section('hero-class', 'hero_area')

@section('hero-content')
    @include('partials.slider')
@endsection

@section('content')
    <!-- about section -->
    <section class="about_section layout_padding">
        <div class="container">
            <div class="row">
                <!-- Left image -->
                <div class="col-md-6">
                    <div class="img-box detail-box">
                        <img src="{{ asset('images/2.png') }}" alt="" />
                    </div>
                </div>
                <!-- Right text -->
                <div class="col-md-6">
                    <div class="detail-box">
                        <div class="heading_container">
                            <h2>Welcome to <span>chefcraft</span></h2>
                        </div>
                        <p>
                            Turn your passion for cooking into a skill! Explore culinary arts with our courses, learn from professional chefs, and master global techniques. Whether for a career or personal growth, embark on a flavorful journey today!
                        </p>
                        <div class="mt-4">
                            <a href="{{ route('courses') }}" class="btn btn-primary">Explore Courses</a>
                            <a href="{{ route('about') }}" class="btn btn-outline-secondary ml-2">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="portfolio_section">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    Popular Cuisines
                </h2>
            </div>
            <div class="carousel-wrap">
                <div class="filter_box">
                    <nav class="owl-filter-bar">
                        <a href="#" class="item active" data-owl-filter="*">All</a>
                        <a href="#" class="item" data-owl-filter=".Arabic">Arabic Cuisine</a>
                        <a href="#" class="item" data-owl-filter=".Italian">Italian Cuisine </a>
                        <a href="#" class="item" data-owl-filter=".Korean">Korean Cuisine</a>
                        <a href="#" class="item" data-owl-filter=".Indian">Indian Cuisine </a>
                    </nav>
                </div>
            </div>
        </div>
        <div class="owl-carousel portfolio_carousel">
            <div class="item Arabic">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/5.jpg') }}" alt="Arabic dish" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Italian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/9.jpg') }}" alt="Italian Cuisine" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Korean">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/11.jpg') }}" alt="Korean Cuisine" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Indian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/14.jpg') }}" alt="Indian Cuisine" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="service_section layout_padding">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>Featured <span>Chefs</span></h2>
            </div>
            <div class="row">
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/17.avif') }}" alt="Sanjeev Kapoor" />
                        </div>
                        <div class="detail-box">
                            <h5>Sanjeev Kapoor</h5>
                            <p>Master of Indian Cuisine</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/18.png') }}" alt="Paik Jong-won" />
                        </div>
                        <div class="detail-box">
                            <h5>Paik Jong-won</h5>
                            <p>Korean Culinary Expert</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/19.jpg') }}" alt="Luigi Fineo" />
                        </div>
                        <div class="detail-box">
                            <h5>Luigi Fineo</h5>
                            <p>Italian Cuisine Specialist</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-4">
                <a href="{{ route('top-chef') }}" class="btn btn-primary">See All Chefs</a>
            </div>
        </div>
    </section>

    <!-- Contact section with simpler form -->
    <section class="contact_section">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>Start Your <span>Journey</span></h2>
                <p class="mt-3">Join thousands of food enthusiasts learning from the world's best chefs</p>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-md-8 text-center">
                    <div class="d-flex justify-content-center">
                        <a href="{{ route('register') }}" class="btn btn-primary mx-2 px-4 py-2">Sign Up Now</a>
                        <a href="{{ route('courses') }}" class="btn btn-outline-secondary mx-2 px-4 py-2">Browse Courses</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonial section -->
    @include('partials.testimonial')
@endsection

@push('scripts')
<script>
    $(document).ready(function() {
        // Initialize the owl carousel
        $('.portfolio_carousel').owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            autoplay: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    });
</script>
@endpushoverlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Arabic">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/6.jpg') }}" alt="Arabic Cuisine 2" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Italian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/8.jpg') }}" alt="Italian dish" />
                        <div class="btn_