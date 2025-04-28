@extends('layouts.guest')

@section('title', 'Courses')

@push('styles')
<style>
    .filter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
    }
    
    .filter-btn {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
    }
    
    .filter-btn:hover {
        background-color: #f0f0f0;
    }
    
    .filter-btn.active {
        background-color: #4A6FA5;
        color: white;
        border-color: #4A6FA5;
    }
    
    .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }
    
    .course-card {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .course-card:hover {
        transform: translateY(-5px);
    }
    
    .card-img {
        height: 200px;
        background-size: cover;
        background-position: center;
    }
    
    .card-content {
        padding: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    
    .cuisine-tag {
        display: inline-block;
        background-color: #e9f2ff;
        color: #4A6FA5;
        padding: 4px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        margin-bottom: 10px;
    }
    
    .card-title {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #333;
    }
    
    .card-description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 15px;
        flex-grow: 1;
    }
    
    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .price {
        font-weight: bold;
        color: #4A6FA5;
    }
    
    .enroll-btn {
        background-color: #4A6FA5;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .enroll-btn:hover {
        background-color: #3a5980;
    }
    
    .no-results {
        text-align: center;
        grid-column: 1 / -1;
        padding: 40px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>
@endpush

@section('content')
<div class="container my-5">
    <header class="text-center mb-5">
        <h1>Culinary Courses</h1>
        <p class="subtitle">Discover exceptional cooking classes from around the world</p>
    </header>
    
    <div class="filter-container">
        <button class="filter-btn active" data-cuisine="all">All Cuisines</button>
        <button class="filter-btn" data-cuisine="arabic">Arabic Cuisine</button>
        <button class="filter-btn" data-cuisine="italian">Italian Cuisine</button>
        <button class="filter-btn" data-cuisine="indian">Indian Cuisine</button>
        <button class="filter-btn" data-cuisine="japanese">Japanese Cuisine</button>
        <button class="filter-btn" data-cuisine="mexican">Mexican Cuisine</button>
        <button class="filter-btn" data-cuisine="french">French Cuisine</button>
    </div>
    
    <div class="courses-grid" id="courses-container">
        <!-- Cards will be dynamically inserted here through JavaScript -->
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Course data - in a real application, this would come from the backend
    const courses = [
        {
            id: 1,
            title: "Authentic Mezze Platter",
            cuisine: "arabic",
            description: "Learn how to prepare a traditional mezze platter with hummus, baba ganoush, tabbouleh, and more.",
            price: "$89",
            image: "{{ asset('images/5.jpg') }}"
        },
        {
            id: 2,
            title: "Pasta Making Masterclass",
            cuisine: "italian",
            description: "Master the art of making fresh pasta from scratch, including various shapes and fillings.",
            price: "$75",
            image: "{{ asset('images/8.jpg') }}"
        },
        {
            id: 3,
            title: "Butter Chicken & Naan",
            cuisine: "indian",
            description: "Create the perfect butter chicken with homemade naan bread in this comprehensive workshop.",
            price: "$65",
            image: "{{ asset('images/14.jpg') }}"
        },
        {
            id: 4,
            title: "Sushi Fundamentals",
            cuisine: "japanese",
            description: "Learn the essential techniques for preparing perfect sushi rice, maki rolls, and nigiri.",
            price: "$95",
            image: "{{ asset('images/sushi.jpg') }}"
        },
        {
            id: 5,
            title: "Street Tacos Workshop",
            cuisine: "mexican",
            description: "Discover authentic Mexican street taco recipes, from handmade tortillas to flavorful fillings.",
            price: "$70",
            image: "{{ asset('images/tacos.jpg') }}"
        },
        {
            id: 6,
            title: "Arabic Sweets & Desserts",
            cuisine: "arabic",
            description: "Master the art of making baklava, kunafa, and other traditional Arabic sweet treats.",
            price: "$85",
            image: "{{ asset('images/6.jpg') }}"
        },
        {
            id: 7,
            title: "Risotto Techniques",
            cuisine: "italian",
            description: "Perfect the creamy texture and rich flavors of authentic Italian risotto with seasonal variations.",
            price: "$80",
            image: "{{ asset('images/9.jpg') }}"
        },
        {
            id: 8,
            title: "Croissant Masterclass",
            cuisine: "french",
            description: "Learn the art of laminated dough and create perfect buttery croissants from scratch.",
            price: "$90",
            image: "{{ asset('images/croissant.jpg') }}"
        },
        {
            id: 9,
            title: "Mansaf Preparation",
            cuisine: "arabic",
            description: "Learn to prepare the traditional Jordanian dish Mansaf with lamb, rice, and jameed sauce.",
            price: "$95",
            image: "{{ asset('images/7.jpg') }}"
        },
        {
            id: 10,
            title: "Tandoori Cooking Essentials",
            cuisine: "indian",
            description: "Master the techniques of tandoori cooking, from marinating to achieving the perfect char.",
            price: "$75",
            image: "{{ asset('images/15.jpg') }}"
        },
        {
            id: 11,
            title: "Ramen from Scratch",
            cuisine: "japanese",
            description: "Create authentic Japanese ramen from broth to toppings in this comprehensive workshop.",
            price: "$85",
            image: "{{ asset('images/ramen.jpg') }}"
        },
        {
            id: 12, 
            title: "Arabic Bread Baking",
            cuisine: "arabic",
            description: "Learn to make various Arabic breads including pita, manakish, and saj bread using traditional methods.",
            price: "$65",
            image: "{{ asset('images/bread.jpg') }}"
        }
    ];
    
    // Function to create course cards
    function createCourseCard(course) {
        return `
            <div class="course-card" data-cuisine="${course.cuisine}">
                <div class="card-img" style="background-image: url('${course.image}')"></div>
                <div class="card-content">
                    <span class="cuisine-tag">${course.cuisine.charAt(0).toUpperCase() + course.cuisine.slice(1)}</span>
                    <h3 class="card-title">${course.title}</h3>
                    <p class="card-description">${course.description}</p>
                    <div class="card-footer">
                        <span class="price">${course.price}</span>
                        <a href="{{ route('login') }}" class="enroll-btn">Enroll Now</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Function to display courses
    function displayCourses(cuisine = 'all') {
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = '';
        
        const filteredCourses = cuisine === 'all' 
            ? courses 
            : courses.filter(course => course.cuisine === cuisine);
        
        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = `
                <div class="no-results">
                    <h3>No courses found</h3>
                    <p>Please try selecting a different cuisine.</p>
                </div>
            `;
            return;
        }
        
        filteredCourses.forEach(course => {
            coursesContainer.innerHTML += createCourseCard(course);
        });
    }
    
    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
        // Display all courses initially
        displayCourses();
        
        // Set up filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter courses
                const cuisine = button.getAttribute('data-cuisine');
                displayCourses(cuisine);
            });
        });
    });
</script>
@endpush