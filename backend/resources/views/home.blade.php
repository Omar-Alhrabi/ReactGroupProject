<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- Basic -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Site Metas -->
    <meta name="keywords" content="culinary, cooking, chef, cuisine, food" />
    <meta name="description" content="ChefCraft - Learn cooking from world-class chefs" />
    <meta name="author" content="ChefCraft" />

    <title>{{ config('app.name', 'ChefCraft') }} - @yield('title', 'Cooking Classes')</title>

    <!-- bootstrap core css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.css') }}" />

    <!-- fonts style -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- owl slider stylesheet -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
    
    <!-- font awesome style -->
    <link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" />
    
    <!-- responsive style -->
    <link href="{{ asset('css/responsive.css') }}" rel="stylesheet" />
    
    @stack('styles')
</head>

<body class="sub_page">
    <div class="hero_area">
        @include('partials.header')
    </div>

    @yield('content')

    @include('partials.footer')

    @stack('scripts')
</body>
</html>

@extends('layouts.app')

@section('title', 'Home')

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
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="portfolio_section">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    Categories
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
                        <img src="{{ asset('images/5.jpg') }}" alt="" />
                        <div class="btn_overlay">
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
            <div class="item Arabic">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/7.jpg') }}" alt="Arabic Cuisine 3" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Italian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/8.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Italian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/9.jpg') }}" alt="Italian Cuisine 3" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Italian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/10.jpg') }}" alt="Italian Cuisine 3" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">See More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Korean decorative">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/11.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Korean decorative">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/12.avif') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Korean decorative">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/13.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Indian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/14.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Indian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/15.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item Indian">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/16.jpg') }}" alt="" />
                        <div class="btn_overlay">
                            <a href="{{ route('login') }}" class="">
                                See More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="service_section layout_padding">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>Top <span>Chef</span></h2>
            </div>
            <div class="row">
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/17.avif') }}" alt="" />
                        </div>
                        <div class="detail-box">
                            <h5>
                                Sanjeev Kapoor
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/18.png') }}" alt="" />
                        </div>
                        <div class="detail-box">
                            <h5>
                                Paik Jong-won
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="box">
                        <div class="img-box">
                            <img src="{{ asset('images/19.jpg') }}" alt="" />
                        </div>
                        <div class="detail-box">
                            <h5>
                                Luigi Fineo
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- contact section -->
    <section class="contact_section">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>Contact <span>Us</span></h2>
            </div>
            <div class="row">
                <div class="col-md-6 px-0">
                    <div class="form_container">
                        <form action="{{ route('contact.submit') }}" method="POST">
                            @csrf
                            <div class="form-row">
                                <div class="form-group col">
                                    <input type="text" name="name" class="form-control" placeholder="Your Name" required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-lg-12">
                                    <input type="text" name="phone" class="form-control" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col">
                                    <input type="email" name="email" class="form-control" placeholder="Email" required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col">
                                    <input type="text" name="message" class="message-box form-control" placeholder="Message" required />
                                </div>
                            </div>
                            <div class="btn_box">
                                <button type="submit">
                                    SEND
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6 px-0">
                    <div class="map_container">
                        <img src="{{ asset('images/24.jpg') }}">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end contact section -->

    <!-- client section -->
    <section class="client_section layout_padding">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    Testimonial
                </h2>
            </div>
            <div class="row">
                <div class="col-md-9 mx-auto">
                    <div id="customCarousel2" class="carousel slide" data-ride="carousel">
                        <div class="row">
                            <div class="col-md-11">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="box">
                                            <div class="client_id">
                                                <div class="img-box">
                                                    <img src="{{ asset('images/21.png') }}" alt="" />
                                                </div>
                                                <h5>
                                                    Sarah Johnson </h5>
                                            </div>
                                            <div class="detail-box">
                                                <p>
                                                    I absolutely love the variety of cuisines available. The recipes are authentic, and the step-by-step videos make learning so much easier. Highly recommended!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="box">
                                            <div class="client_id">
                                                <div class="img-box">
                                                    <img src="{{ asset('images/22.png') }}" alt="" />
                                                </div>
                                                <h5>
                                                    Ahmed Khalil
                                                </h5>
                                            </div>
                                            <div class="detail-box">
                                                <p>
                                                    As a beginner, I found the courses very beginner-friendly. The chefs explain everything in detail, and the platform is super easy to navigate!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="box">
                                            <div class="client_id">
                                                <div class="img-box">
                                                    <img src="{{ asset('images/23.png') }}" alt="" />
                                                </div>
                                                <h5>
                                                    Alex Jonson
                                                </h5>
                                            </div>
                                            <div class="detail-box">
                                                <p>
                                                    This platform exceeded my expectations! The chefs are highly skilled, and the interactive lessons made learning fun and engaging. I can't wait to try more courses!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <ol class="carousel-indicators">
                                    <li data-target="#customCarousel2" data-slide-to="0" class="active"></li>
                                    <li data-target="#customCarousel2" data-slide-to="1"></li>
                                    <li data-target="#customCarousel2" data-slide-to="2"></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
@endpush