<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\KitchenController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\ChefController;

// Landing page - main entry point
Route::get('/', function () {
    return view('landing');
})->name('home');

// About page
Route::view('/about', 'about')->name('about');

// Top Chef page
Route::view('/top-chef', 'top-chef')->name('top-chef');

// Courses page
Route::view('/courses', 'courses')->name('courses');

// Contact routes
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

// Chef profile pages
Route::get('/chefs/{chef}', [ChefController::class, 'show'])->name('chefs.show');
Route::get('/chefs/{chef}/courses', [ChefController::class, 'courses'])->name('chefs.courses');

// Authentication routes (Laravel Breeze/Fortify will handle this)
require __DIR__.'/auth.php';

// Protected routes for authenticated users
Route::middleware('auth')->group(function () {
    // User profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // User dashboard
    Route::get('/dashboard', function () {
        // Redirect admins and chefs to the admin dashboard
        if (Auth::check() && (Auth::user()->role == 'admin' || Auth::user()->role == 'chef')) {
            return redirect()->route('admin.dashboard');
        }
        // Regular users go to the standard dashboard
        return view('dashboard');
    })->name('dashboard');
    
    // Course enrollment and viewing
    Route::get('/course/{id}', function ($id) {
        return view('course');
    })->name('course');
    
    // Learning paths
    Route::get('/learning-paths', function () {
        return view('learning.paths');
    })->name('learning.paths');
});

// Admin dashboard routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Users
    Route::resource('users', UserController::class);
    
    // Kitchens/Cuisines
    Route::resource('kitchens', KitchenController::class);
    
    // Courses
    Route::resource('courses', CourseController::class);
    
    // Videos
    Route::resource('videos', VideoController::class);
    
    // Payments
    Route::resource('payments', PaymentController::class);
    
    // Reviews
    Route::resource('reviews', ReviewController::class);
    
    // Testimonials
    Route::resource('testimonials', TestimonialController::class);
    Route::put('testimonials/{testimonial}/toggle-approval', [TestimonialController::class, 'toggleApproval'])
        ->name('testimonials.toggleApproval');
});