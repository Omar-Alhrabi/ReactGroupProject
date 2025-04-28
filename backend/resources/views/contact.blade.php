@extends('layouts.guest')

@section('title', 'Contact Us')

@section('content')
<!-- contact section -->
<section class="contact_section layout_padding">
    <div class="container">
        <div class="heading_container heading_center">
            <h2>chef<span>craft</span></h2>
        </div>
        <div class="row">
            <div class="col-md-6 px-0">
                <div class="form_container">
                    <form action="{{ route('contact.submit') }}" method="POST">
                        @csrf
                        <div class="form-row">
                            <div class="form-group col">
                                <input type="text" name="name" class="form-control" placeholder="Your Name" required />
                                @error('name')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-lg-12">
                                <input type="text" name="phone" class="form-control" placeholder="Phone Number" />
                                @error('phone')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <input type="email" name="email" class="form-control" placeholder="Email" required />
                                @error('email')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <input type="text" name="message" class="message-box form-control" placeholder="Message" required />
                                @error('message')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
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

@if(session('success'))
<div class="alert alert-success alert-dismissible fade show container mt-3" role="alert">
    {{ session('success') }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif
@endsection