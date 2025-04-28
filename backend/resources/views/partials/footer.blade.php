<footer class="footer_section text-white py-4">
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <h4 class="fw-bold mb-3">ChefCraft</h4>
                <p>Discover a world of culinary excellence with our premium cooking courses. 
                   Learn from top chefs, explore diverse cuisines, and elevate your cooking skills—all in one place!</p>
            </div>
            <div class="col-lg-2 col-md-4">
                <h5 class="mb-3 text-white">Quick Links</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a class="footer-link" href="{{ route('home') }}">Home</a></li>
                    <li class="mb-2"><a class="footer-link" href="{{ route('top-chef') }}">Top Chef</a></li>
                    <li class="mb-2"><a class="footer-link" href="{{ route('about') }}">About</a></li>
                    <li class="mb-2"><a class="footer-link" href="{{ route('courses') }}">Courses</a></li>
                    <li class="mb-2"><a class="footer-link" href="{{ route('contact') }}">Contact Us</a></li>
                </ul>
            </div>

            <!-- Services section -->
            <div class="col-lg-2 col-md-4">
                <h5 class="mb-3 text-white">Services</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a class="footer-link" href="{{ route('courses') }}">Courses</a></li>
                    <li class="mb-2"><a class="footer-link" href="#">Learn</a></li>
                </ul>
            </div>

            <!-- Legal section -->
            <div class="col-lg-2 col-md-4">
                <h5 class="mb-3 text-white">Legal</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a class="footer-link" href="#">Terms</a></li>
                    <li class="mb-2"><a class="footer-link" href="#">Privacy</a></li>
                </ul>
            </div>
        </div>
    </div> 
    <div class="border-top border-secondary pt-4 mt-5">
        <div class="row justify-content-center">
            <p>&copy; <span id="displayYear">{{ date('Y') }}</span> All Rights Reserved By Chefcraft</p>
        </div>
    </div>
</footer>

<style>
    footer {
        background-color: black;
    }
    .footer-link {
        color: white;
        text-decoration: none;
        transition: color 0.3s;
    }
    .footer-link:hover {
        color: #da7426;
    }
</style>

<!-- Scripts -->
<script src="{{ asset('js/jquery-3.4.1.min.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="{{ asset('js/bootstrap.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
<script src="https://huynhhuynh.github.io/owlcarousel2-filter/dist/owlcarousel2-filter.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js" integrity="sha256-Zr3vByTlMGQhvMfgkQ5BtWRSKBGa2QlspKYJnkjZTmo=" crossorigin="anonymous"></script>
<script src="{{ asset('js/custom.js') }}"></script>

<script>
    document.getElementById('displayYear').textContent = new Date().getFullYear();
</script>