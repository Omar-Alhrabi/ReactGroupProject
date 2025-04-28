@extends('layouts.guest')

@section('title', 'About Us')

@section('content')
<!-- about section -->
<section class="about_section layout_padding">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="detail-box">
                    <div class="heading_container">
                        <h2>Welcome to <span>chefcraft</span></h2>
                    </div>
                    <p>
                        Turn your passion for cooking into a real skill! 
                        Discover the world of culinary arts with our specialized courses 
                        that allow you to learn the secrets of professional chefs and master
                        global cooking techniques. Whether you aspire to become a 
                        professional chef or simply want to enhance your kitchen 
                        skills, we are here to take you on a journey filled with flavors
                        and creativity. Start now and enjoy a cooking experience like 
                        no other!
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="img-box">
                    <img src="{{ asset('images/2.png') }}" alt="About ChefCraft" />
                </div>
            </div>
        </div>
    </div>
</section>
@endsection