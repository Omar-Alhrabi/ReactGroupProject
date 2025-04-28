@extends('layouts.app')

@section('title', 'Dashboard')

@section('body-class', 'dashboard-page')

@section('hero-class', '')

@section('content')
<div class="container py-5">
    <div class="row">
        <div class="col-md-3">
            <div class="card">
                <div class="card-header">
                    <h5>My Account</h5>
                </div>
                <div class="list-group list-group-flush">
                    <a href="{{ route('dashboard') }}" class="list-group-item list-group-item-action active">Dashboard</a>
                    <a href="{{ route('profile.edit') }}" class="list-group-item list-group-item-action">Profile</a>
                    <a href="#" class="list-group-item list-group-item-action">My Courses</a>
                    <a href="#" class="list-group-item list-group-item-action">Saved Recipes</a>
                    <a href="#" class="list-group-item list-group-item-action">Purchase History</a>
                    <a href="{{ route('logout') }}" class="list-group-item list-group-item-action text-danger" 
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        Logout
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Welcome, {{ Auth::user()->name }}!</h5>
                    <span class="badge badge-primary">{{ ucfirst(Auth::user()->role) }}</span>
                </div>
                <div class="card-body">
                    <p>Welcome to your ChefCraft dashboard. Here you can manage your courses, track your progress, and discover new culinary adventures.</p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5>My Courses</h5>
                        </div>
                        <div class="card-body">
                            @if(isset($enrolledCourses) && count($enrolledCourses) > 0)
                                <ul class="list-group">
                                    @foreach($enrolledCourses as $course)
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            {{ $course->title }}
                                            <span class="badge badge-primary badge-pill">{{ $course->progress }}%</span>
                                        </li>
                                    @endforeach
                                </ul>
                            @else
                                <p>You are not enrolled in any courses yet.</p>
                                <a href="{{ route('courses') }}" class="btn btn-primary">Browse Courses</a>
                            @endif
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5>Recommended For You</h5>
                        </div>
                        <div class="card-body">
                            <div class="recommended-course mb-3">
                                <div class="d-flex">
                                    <img src="{{ asset('images/5.jpg') }}" alt="Course Image" class="mr-3" style="width: 80px; height: 60px; object-fit: cover;">
                                    <div>
                                        <h6>Authentic Mezze Platter</h6>
                                        <p class="text-muted mb-0">Arabic Cuisine</p>
                                    </div>
                                </div>
                            </div>
                            <div class="recommended-course mb-3">
                                <div class="d-flex">
                                    <img src="{{ asset('images/8.jpg') }}" alt="Course Image" class="mr-3" style="width: 80px; height: 60px; object-fit: cover;">
                                    <div>
                                        <h6>Pasta Making Masterclass</h6>
                                        <p class="text-muted mb-0">Italian Cuisine</p>
                                    </div>
                                </div>
                            </div>
                            <a href="{{ route('courses') }}" class="btn btn-outline-primary btn-sm">View All Recommendations</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Your Learning Progress</h5>
                        </div>
                        <div class="card-body">
                            @if(isset($enrolledCourses) && count($enrolledCourses) > 0)
                                <div class="progress-container">
                                    <!-- Progress charts would go here in a real app -->
                                    <p>Your learning statistics will appear here as you progress through courses.</p>
                                </div>
                            @else
                                <div class="text-center py-4">
                                    <img src="{{ asset('images/chef-hat.png') }}" alt="Chef Hat" style="width: 80px; opacity: 0.6;">
                                    <h4 class="mt-3">Start Your Culinary Journey Today!</h4>
                                    <p>Enroll in a course to track your progress and achievements.</p>
                                    <a href="{{ route('courses') }}" class="btn btn-primary mt-2">Explore Courses</a>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
    .dashboard-page {
        background-color: #f8f9fa;
    }
    
    .card {
        border-radius: 10px;
        border: none;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        margin-bottom: 20px;
    }
    
    .card-header {
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        padding: 15px 20px;
    }
    
    .list-group-item.active {
        background-color: #da7426;
        border-color: #da7426;
    }
    
    .badge-primary {
        background-color: #da7426;
    }
    
    .btn-primary {
        background-color: #da7426;
        border-color: #da7426;
    }
    
    .btn-primary:hover {
        background-color: #c56821;
        border-color: #c56821;
    }
    
    .btn-outline-primary {
        color: #da7426;
        border-color: #da7426;
    }
    
    .btn-outline-primary:hover {
        background-color: #da7426;
        border-color: #da7426;
    }
    
    .recommended-course {
        transition: transform 0.2s;
    }
    
    .recommended-course:hover {
        transform: translateX(5px);
    }
</style>
@endpush