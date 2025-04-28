@extends('layouts.guest')

@section('title', 'Top Chefs')

@section('content')
<section class="service_section layout_padding">
    <div class="container">
        <div class="heading_container heading_center">
            <h2>Top <span>Chef</span></h2>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/17.avif') }}" alt="Sanjeev Kapoor" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Sanjeev Kapoor
                        </h5>
                        <p>
                            Renowned Indian chef and entrepreneur, known for his innovative approach to traditional Indian cuisine.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/18.png') }}" alt="Paik Jong-won" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Paik Jong-won
                        </h5>
                        <p>
                            A South Korean chef, restaurateur, and television personality famous for making Korean cuisine accessible to everyone.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/19.jpg') }}" alt="Luigi Fineo" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Luigi Fineo
                        </h5>
                        <p>
                            An Italian culinary master who brings authentic Mediterranean flavors with a modern twist to his signature dishes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/chef4.jpg') }}" alt="Chef 4" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Alia Rahman
                        </h5>
                        <p>
                            Specializing in Middle Eastern cuisine, Alia combines traditional techniques with contemporary presentation.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/chef5.jpg') }}" alt="Chef 5" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Carlos Mendez
                        </h5>
                        <p>
                            A passionate expert in Latin American cuisine with a focus on sustainable cooking practices.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="box">
                    <div class="img-box">
                        <img src="{{ asset('images/chef6.jpg') }}" alt="Chef 6" />
                    </div>
                    <div class="detail-box">
                        <h5>
                            Mei Zhang
                        </h5>
                        <p>
                            Master of Chinese regional cuisines, Mei is known for her delicate dim sum and complex flavor profiles.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection