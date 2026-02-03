// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(107, 142, 110, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(107, 142, 110, 0.1)';
    }
});

// Timeline scroll animation - items fade/slide in as you scroll
const leadershipTimelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

leadershipTimelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Fade in animation for elements on scroll
const fadeElements = document.querySelectorAll('.service-card, .project-card, .leadership-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for intro section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const introSection = document.querySelector('.intro-section');
    if (introSection && scrolled < window.innerHeight) {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            const speed = (index + 1) * 0.1;
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    }
});

// Add smooth reveal animation for about section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutObserver.observe(aboutContent);
}

// Matcha Making Game - Interactive Matcha Creation (Unlimited Additions)
class MatchaMakingGame {
    constructor() {
        this.temperature = 'hot'; // 'hot' or 'cold'
        this.ingredientCounts = {
            ice: 0,
            matcha: 0,
            milk: 0
        };
        this.layerHeights = {
            ice: 0,
            matcha: 0,
            milk: 0,
            foam: 0
        };
        this.maxFill = 100; // Maximum fill percentage
        this.currentFill = 0; // Current fill percentage
        this.ingredientFillAmounts = {
            ice: 5,      // Each ice cube adds 5%
            matcha: 8,   // Each matcha addition adds 8%
            milk: 10    // Each milk addition adds 10%
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.resetGame();
        this.updateTemperatureUI();
    }

    setupEventListeners() {
        const tempButtons = document.querySelectorAll('.temp-btn');
        const ingredientButtons = document.querySelectorAll('.ingredient-btn');
        const resetBtn = document.getElementById('reset-matcha');

        // Temperature selection
        tempButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectTemperature(btn);
            });
        });

        // Ingredient buttons
        ingredientButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.addIngredient(btn);
            });
        });

        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetGame();
            });
        }
    }

    selectTemperature(button) {
        // Remove active class from all temperature buttons
        document.querySelectorAll('.temp-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        button.classList.add('active');
        
        // Update temperature
        this.temperature = button.dataset.temp;
        
        // Update ice button availability
        const iceBtn = document.getElementById('btn-ice');
        if (iceBtn) {
            if (this.temperature === 'cold') {
                iceBtn.disabled = false;
            } else {
                iceBtn.disabled = true;
                // Remove all ice if switching to hot
                if (this.ingredientCounts.ice > 0) {
                    this.removeAllIngredient('ice');
                }
            }
        }
        
        // Reset and update display
        this.resetGame();
    }

    addIngredient(button) {
        const ingredient = button.dataset.ingredient;
        
        // Special check for ice
        if (ingredient === 'ice' && this.temperature !== 'cold') {
            return;
        }

        // Check if glass is full
        const fillAmount = this.ingredientFillAmounts[ingredient];
        if (this.currentFill + fillAmount > this.maxFill) {
            // Can't add more - glass is full
            this.showFullMessage();
            return;
        }

        // Add ingredient
        this.ingredientCounts[ingredient]++;
        this.currentFill = Math.min(this.currentFill + fillAmount, this.maxFill);
        
        // Update button count display
        this.updateButtonCount(ingredient);
        
        // Add visual layer and animation
        this.animateIngredient(ingredient);
        
        // Update fill indicator
        this.updateFillIndicator();
        
        // Update ingredient counts display
        this.updateIngredientCounts();
        
        // Check if glass is full
        if (this.currentFill >= this.maxFill) {
            this.showResult();
        }
    }

    updateButtonCount(ingredient) {
        const countEl = document.getElementById(`count-${ingredient}`);
        if (countEl) {
            countEl.textContent = this.ingredientCounts[ingredient];
        }
    }

    showFullMessage() {
        const stepsText = document.getElementById('steps-text');
        if (stepsText) {
            const originalText = stepsText.textContent;
            stepsText.textContent = '🍵 Glass is full! Click "Start Over" to make a new matcha.';
            stepsText.style.color = 'var(--matcha-dark)';
            stepsText.style.fontWeight = '600';
            
            setTimeout(() => {
                stepsText.textContent = originalText;
                stepsText.style.color = '';
                stepsText.style.fontWeight = '';
            }, 3000);
        }
    }

    animateIngredient(ingredient) {
        switch(ingredient) {
            case 'ice':
                this.addIce();
                break;
            case 'matcha':
                this.addMatcha();
                break;
            case 'milk':
                this.addMilk();
                break;
        }
    }

    addIce() {
        const iceCubes = document.getElementById('ice-cubes');
        if (iceCubes) {
            iceCubes.style.display = 'flex';
            // Add new ice cube
            const newCube = document.createElement('div');
            newCube.className = 'ice-cube';
            iceCubes.appendChild(newCube);
            // Animate new cube falling
            setTimeout(() => {
                newCube.style.animation = `iceFall 0.8s ease both`;
            }, 10);
        }
        // Update ice layer height as percentage of current fill (ice fills up to 30% max)
        const iceFill = this.ingredientCounts.ice * this.ingredientFillAmounts.ice;
        this.layerHeights.ice = this.currentFill > 0 ? Math.min(30, (iceFill / this.currentFill) * 100) : 0;
    }

    addMatcha() {
        const matchaLayer = document.getElementById('matcha-layer');
        const whiskAnimation = document.getElementById('whisk-animation');
        
        // Show whisking animation (only sometimes to not be too repetitive)
        if (whiskAnimation && this.ingredientCounts.matcha % 3 === 1) {
            whiskAnimation.classList.add('active');
            setTimeout(() => {
                whiskAnimation.classList.remove('active');
            }, 1000);
        }
        
        // Add matcha layer with animation — matcha goes all the way to the bottom
        setTimeout(() => {
            if (matchaLayer) {
                const matchaFill = this.ingredientCounts.matcha * this.ingredientFillAmounts.matcha;
                const matchaHeight = this.currentFill > 0 ? (matchaFill / this.currentFill) * 100 : 0;
                // Matcha extends from bottom (0) up through ice + matcha so green fills to the bottom
                const totalHeight = this.layerHeights.ice + matchaHeight;

                if (this.ingredientCounts.milk > 0) {
                    matchaLayer.classList.add('with-milk');
                } else {
                    matchaLayer.classList.remove('with-milk');
                }

                matchaLayer.style.bottom = '0%';
                matchaLayer.style.height = totalHeight + '%';
                matchaLayer.classList.add('pouring');
                this.layerHeights.matcha = matchaHeight;
                setTimeout(() => {
                    matchaLayer.classList.remove('pouring');
                }, 1000);
            }
        }, 300);
    }

    addMilk() {
        const milkLayer = document.getElementById('milk-layer');
        const foamLayer = document.getElementById('foam-layer');
        const milkPour = document.getElementById('milk-pour');
        const matchaLayer = document.getElementById('matcha-layer');
        
        // Show milk pouring animation (every time for visual feedback)
        if (milkPour) {
            milkPour.classList.add('active');
            setTimeout(() => {
                milkPour.classList.remove('active');
            }, 1500);
        }
        
        // Add milk layer with animation
        setTimeout(() => {
            // Calculate milk height as percentage of current fill
            const baseHeight = this.layerHeights.ice + this.layerHeights.matcha;
            const milkFill = this.ingredientCounts.milk * this.ingredientFillAmounts.milk;
            const totalMilkHeight = this.currentFill > 0 ? (milkFill / this.currentFill) * 100 : 0;
            // Separate milk and foam - foam is up to 8% of total or 15% of milk height
            const foamHeight = Math.min(8, totalMilkHeight * 0.15);
            const milkHeight = totalMilkHeight - foamHeight;
            
            // Make matcha darker when milk is added
            if (matchaLayer && this.ingredientCounts.matcha > 0) {
                matchaLayer.classList.add('with-milk');
            }
            
            if (milkLayer) {
                milkLayer.style.height = milkHeight + '%';
                milkLayer.style.bottom = baseHeight + '%';
                milkLayer.classList.add('pouring');
                setTimeout(() => {
                    milkLayer.classList.remove('pouring');
                }, 1000);
            }
            
            if (foamLayer) {
                foamLayer.style.height = foamHeight + '%';
                foamLayer.style.bottom = (baseHeight + milkHeight) + '%';
            }
            
            this.layerHeights.milk = milkHeight;
            this.layerHeights.foam = foamHeight;
        }, 300);
    }

    removeAllIngredient(ingredient) {
        // Remove all of a specific ingredient
        const removedFill = this.ingredientCounts[ingredient] * this.ingredientFillAmounts[ingredient];
        this.ingredientCounts[ingredient] = 0;
        this.currentFill = Math.max(0, this.currentFill - removedFill);
        
        // Reset layer
        if (ingredient === 'ice') {
            const iceCubes = document.getElementById('ice-cubes');
            if (iceCubes) {
                iceCubes.innerHTML = '';
                iceCubes.style.display = 'none';
            }
            this.layerHeights.ice = 0;
        } else if (ingredient === 'matcha') {
            const matchaLayer = document.getElementById('matcha-layer');
            if (matchaLayer) {
                matchaLayer.style.height = '0%';
                matchaLayer.classList.remove('with-milk');
            }
            this.layerHeights.matcha = 0;
        } else if (ingredient === 'milk') {
            const milkLayer = document.getElementById('milk-layer');
            const foamLayer = document.getElementById('foam-layer');
            const matchaLayer = document.getElementById('matcha-layer');
            if (milkLayer) milkLayer.style.height = '0%';
            if (foamLayer) foamLayer.style.height = '0%';
            // Remove darker matcha effect when milk is removed
            if (matchaLayer) {
                matchaLayer.classList.remove('with-milk');
            }
            this.layerHeights.milk = 0;
            this.layerHeights.foam = 0;
        }
        
        // Update displays
        this.updateButtonCount(ingredient);
        this.updateFillIndicator();
        this.updateIngredientCounts();
    }

    updateFillIndicator() {
        const fillProgress = document.getElementById('fill-progress');
        const fillPercentage = document.getElementById('fill-percentage');
        
        if (fillProgress) {
            fillProgress.style.width = this.currentFill + '%';
            // Change color based on fill level
            if (this.currentFill >= 100) {
                fillProgress.style.background = 'var(--matcha-dark)';
            } else if (this.currentFill >= 75) {
                fillProgress.style.background = 'var(--matcha-green)';
            } else {
                fillProgress.style.background = 'var(--matcha-light)';
            }
        }
        
        if (fillPercentage) {
            fillPercentage.textContent = Math.round(this.currentFill) + '%';
        }
    }

    updateIngredientCounts() {
        const countsContainer = document.getElementById('ingredient-counts');
        if (!countsContainer) return;
        
        const counts = [];
        if (this.temperature === 'cold' && this.ingredientCounts.ice > 0) {
            counts.push(`🧊 Ice: ${this.ingredientCounts.ice}`);
        }
        if (this.ingredientCounts.matcha > 0) {
            counts.push(`🍃 Matcha: ${this.ingredientCounts.matcha}`);
        }
        if (this.ingredientCounts.milk > 0) {
            counts.push(`🥛 Milk: ${this.ingredientCounts.milk}`);
        }
        
        if (counts.length > 0) {
            countsContainer.innerHTML = counts.map(count => 
                `<span class="count-item">${count}</span>`
            ).join('');
        } else {
            countsContainer.innerHTML = '';
        }
    }

    showResult() {
        const resultMessage = document.getElementById('result-message');
        const resultTitle = resultMessage?.querySelector('.result-title');
        const resultText = resultMessage?.querySelector('.result-text');
        
        if (!resultMessage) return;
        
        // Calculate percentages
        const total = this.ingredientCounts.ice + this.ingredientCounts.matcha + this.ingredientCounts.milk;
        const icePercent = total > 0 ? Math.round((this.ingredientCounts.ice / total) * 100) : 0;
        const matchaPercent = total > 0 ? Math.round((this.ingredientCounts.matcha / total) * 100) : 0;
        const milkPercent = total > 0 ? Math.round((this.ingredientCounts.milk / total) * 100) : 0;
        
        // Determine matcha style based on composition
        let title, text;
        
        if (this.temperature === 'cold') {
            if (icePercent > 40) {
                title = '🧊 Extra Icy Matcha!';
                text = `Super refreshing with ${icePercent}% ice! Perfect for hot days.`;
            } else if (matchaPercent > 50) {
                title = '🍃 Matcha-Forward Iced!';
                text = `Strong matcha flavor (${matchaPercent}% matcha) with creamy milk.`;
            } else if (milkPercent > 60) {
                title = '🥛 Creamy Iced Latte!';
                text = `Smooth and creamy with ${milkPercent}% milk. Delicious!`;
            } else {
                title = '✨ Balanced Iced Matcha!';
                text = `Perfect balance: ${icePercent}% ice, ${matchaPercent}% matcha, ${milkPercent}% milk.`;
            }
        } else {
            if (matchaPercent > 60) {
                title = '🍃 Strong Hot Matcha!';
                text = `Bold matcha flavor (${matchaPercent}% matcha). For true matcha lovers!`;
            } else if (milkPercent > 70) {
                title = '🥛 Creamy Matcha Latte!';
                text = `Ultra creamy with ${milkPercent}% milk. So smooth!`;
            } else {
                title = '☕ Classic Hot Matcha Latte!';
                text = `Perfect balance: ${matchaPercent}% matcha, ${milkPercent}% milk. Traditional and delicious!`;
            }
        }
        
        if (resultTitle) resultTitle.textContent = title;
        if (resultText) resultText.textContent = text;
        
        resultMessage.style.display = 'block';
        resultMessage.style.animation = 'fadeInUp 0.5s ease';
    }

    updateTemperatureUI() {
        const steam = document.getElementById('steam');
        const iceCubes = document.getElementById('ice-cubes');
        
        if (steam) {
            steam.style.display = this.temperature === 'hot' ? 'flex' : 'none';
        }
    }

    resetGame() {
        // Reset all ingredients
        this.ingredientCounts = {
            ice: 0,
            matcha: 0,
            milk: 0
        };
        this.currentFill = 0;
        this.layerHeights = {
            ice: 0,
            matcha: 0,
            milk: 0,
            foam: 0
        };
        
        // Reset visual layers
        const matchaLayer = document.getElementById('matcha-layer');
        const milkLayer = document.getElementById('milk-layer');
        const foamLayer = document.getElementById('foam-layer');
        const iceCubes = document.getElementById('ice-cubes');
        const resultMessage = document.getElementById('result-message');
        
        if (matchaLayer) {
            matchaLayer.style.height = '0%';
            matchaLayer.style.bottom = '0%';
            matchaLayer.classList.remove('pouring');
            matchaLayer.classList.remove('with-milk');
        }
        if (milkLayer) {
            milkLayer.style.height = '0%';
            milkLayer.style.bottom = '0%';
            milkLayer.classList.remove('pouring');
        }
        if (foamLayer) {
            foamLayer.style.height = '0%';
            foamLayer.style.bottom = '0%';
        }
        if (iceCubes) {
            iceCubes.innerHTML = '';
            iceCubes.style.display = 'none';
        }
        if (resultMessage) resultMessage.style.display = 'none';
        
        // Reset button counts
        document.querySelectorAll('.ingredient-count').forEach(el => {
            el.textContent = '0';
        });
        
        // Reset buttons (never disabled except ice when hot)
        document.querySelectorAll('.ingredient-btn').forEach(btn => {
            btn.classList.remove('added');
            const ingredient = btn.dataset.ingredient;
            if (ingredient === 'ice') {
                btn.disabled = this.temperature !== 'cold';
            } else {
                btn.disabled = false;
            }
        });
        
        // Update displays
        this.updateTemperatureUI();
        this.updateFillIndicator();
        this.updateIngredientCounts();
    }
}

// Initialize game when page loads
let matchaGame;
document.addEventListener('DOMContentLoaded', () => {
    matchaGame = new MatchaMakingGame();
    
    // Resume card click handler
    const resumeCard = document.getElementById('resume-card');
    const emailMessage = document.getElementById('resume-email-message');
    const closeButton = document.getElementById('close-email-message');
    
    if (resumeCard && emailMessage) {
        resumeCard.addEventListener('click', () => {
            resumeCard.style.display = 'none';
            emailMessage.style.display = 'block';
        });
    }
    
    if (closeButton && resumeCard && emailMessage) {
        closeButton.addEventListener('click', () => {
            emailMessage.style.display = 'none';
            resumeCard.style.display = 'block';
        });
    }
    
    // Photo Gallery Slider
    // TO ADD YOUR OWN PHOTOS:
    // 1. Create a folder called "photos" in your project directory
    // 2. Add your photos to that folder (jpg, png, etc.)
    // 3. Update the src paths below to match your photo filenames
    // 4. Update the captions to describe each photo
    const photoData = [
        {
            src: '/Users/ertatema/Portfolio Web/Photos /image2.jpeg',  // Change this to your photo filename (e.g., 'photos/hiking.jpg')
            caption: 'Me hiking in Albania'  // Update this caption
        },
        {
            src: '/Users/ertatema/Portfolio Web/Photos /image3.jpeg',  // Change this to your photo filename
            caption: 'Trying snowboard for the first time (Very hard)'  // Update this caption
        },
        {
            src: '/Users/ertatema/Portfolio Web/Photos /image4.jpeg',  // Change this to your photo filename
            caption: 'Walking through Frankfurt, Germany'  // Update this caption
        },
        {
            src: '/Users/ertatema/Portfolio Web/Photos /image5.jpeg',  // Change this to your photo filename
            caption: 'Dad and I connecting with the classics'  // Update this caption
        },
        {
            src: '/Users/ertatema/Portfolio Web/Photos /image6.jpeg',  // Change this to your photo filename
            caption: 'Match day in the city'  // Update this caption
        }
        // You can add more photos by copying the format above and adding more objects to this array
    ];
    
    let currentPhotoIndex = 0;
    const currentPhotoImg = document.getElementById('current-photo-img');
    const currentPhotoCaption = document.getElementById('current-photo-caption');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    const photoIndicators = document.getElementById('photo-indicators');
    const photoModal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = photoModal?.querySelector('.modal-overlay');
    
    // Create photo indicators
    if (photoIndicators) {
        photoData.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'photo-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                goToPhoto(index);
            });
            photoIndicators.appendChild(indicator);
        });
    }
    
    // Function to update photo display
    function updatePhoto(index) {
        if (index < 0 || index >= photoData.length) return;
        
        currentPhotoIndex = index;
        const photo = photoData[index];
        
        if (currentPhotoImg && photo) {
            currentPhotoImg.src = photo.src;
            currentPhotoImg.alt = photo.caption;
        }
        
        if (currentPhotoCaption && photo) {
            currentPhotoCaption.textContent = photo.caption;
        }
        
        // Update indicators
        if (photoIndicators) {
            const indicators = photoIndicators.querySelectorAll('.photo-indicator');
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // Function to go to specific photo
    function goToPhoto(index) {
        updatePhoto(index);
    }
    
    // Function to go to next photo
    function nextPhoto() {
        const nextIndex = (currentPhotoIndex + 1) % photoData.length;
        updatePhoto(nextIndex);
    }
    
    // Function to go to previous photo
    function prevPhoto() {
        const prevIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
        updatePhoto(prevIndex);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPhoto);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevPhoto);
    }
    
    // Click on photo to open modal
    if (currentPhotoImg) {
        currentPhotoImg.addEventListener('click', () => {
            const photo = photoData[currentPhotoIndex];
            if (photo && photoModal && modalImage && modalCaption) {
                modalImage.src = photo.src;
                modalImage.alt = photo.caption;
                modalCaption.textContent = photo.caption;
                photoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (photoModal?.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevPhoto();
            } else if (e.key === 'ArrowRight') {
                nextPhoto();
            }
        } else {
            // Navigate gallery with arrow keys when not in modal
            if (e.key === 'ArrowLeft') {
                prevPhoto();
            } else if (e.key === 'ArrowRight') {
                nextPhoto();
            }
        }
    });
    
    // Close modal
    function closeModal() {
        if (photoModal) {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Initialize with first photo
    updatePhoto(0);
    
    // Book of the Month functionality (by year + month)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Book data by year and month. Add your reads per year.
    const booksByYear = {
        2025: {
            'January': { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', rating: 5, description: 'A captivating story about a reclusive Hollywood icon who finally decides to tell her story. This book beautifully explores themes of ambition, love, and the price of fame.', tags: ['Fiction', 'Historical Fiction', 'LGBTQ+'] },
            'February': { title: 'Atomic Habits', author: 'James Clear', rating: 5, description: 'An incredible guide to building good habits and breaking bad ones. Clear provides practical strategies for making small changes that lead to remarkable results.', tags: ['Self-Help', 'Productivity', 'Psychology'] },
            'March': { title: 'The Midnight Library', author: 'Matt Haig', rating: 4, description: 'A thought-provoking novel about life, regrets, and the infinite possibilities that exist. A beautiful exploration of what it means to live a fulfilling life.', tags: ['Fiction', 'Philosophy', 'Fantasy'] },
            'April': { title: 'Project Hail Mary', author: 'Andy Weir', rating: 5, description: 'A thrilling science fiction adventure that combines humor, science, and heart. An astronaut wakes up alone on a spaceship with no memory of his mission.', tags: ['Science Fiction', 'Adventure', 'Space'] },
            'May': { title: 'Educated', author: 'Tara Westover', rating: 5, description: 'A powerful memoir about a woman who grows up in a survivalist family and eventually earns a PhD from Cambridge. A testament to the power of education.', tags: ['Memoir', 'Biography', 'Education'] },
            'June': { title: 'The Song of Achilles', author: 'Madeline Miller', rating: 5, description: 'A beautiful retelling of the Iliad from Patroclus\'s perspective. A story of love, war, and the bonds that define us.', tags: ['Fiction', 'Mythology', 'Historical Fiction'] },
            'July': { title: 'Dune', author: 'Frank Herbert', rating: 5, description: 'An epic science fiction masterpiece set on the desert planet Arrakis. A complex tale of politics, religion, and ecology.', tags: ['Science Fiction', 'Fantasy', 'Classic'] },
            'August': { title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', rating: 4, description: 'A woman makes a deal with the devil and becomes immortal, but no one remembers her. A beautiful exploration of memory, art, and what makes life meaningful.', tags: ['Fantasy', 'Fiction', 'Historical Fiction'] },
            'September': { title: 'Sapiens', author: 'Yuval Noah Harari', rating: 5, description: 'A brief history of humankind that explores how Homo sapiens came to dominate the world. Thought-provoking and eye-opening.', tags: ['Non-Fiction', 'History', 'Anthropology'] },
            'October': { title: 'Circe', author: 'Madeline Miller', rating: 5, description: 'A reimagining of the Greek myth of Circe, the witch of Aiaia. A powerful story of a woman finding her own power and voice.', tags: ['Fiction', 'Mythology', 'Fantasy'] },
            'November': { title: 'The Psychology of Money', author: 'Morgan Housel', rating: 4, description: 'Timeless lessons on wealth, greed, and happiness. A refreshing take on personal finance that focuses on behavior over formulas.', tags: ['Finance', 'Psychology', 'Self-Help'] },
            'December': { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', rating: 5, description: 'A story told from the perspective of an artificial friend observing the world. A beautiful meditation on love, consciousness, and what it means to be human.', tags: ['Science Fiction', 'Literary Fiction', 'Dystopian'] }
        },
        2026: {
            'January': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your January 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'February': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your February 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'March': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your March 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'April': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your April 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'May': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your May 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'June': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your June 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'July': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your July 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'August': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your August 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'September': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your September 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'October': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your October 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'November': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your November 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] },
            'December': { title: 'Coming soon', author: '—', rating: 0, description: 'Add your December 2026 pick in script.js under booksByYear[2026].', tags: ['TBR'] }
        }
    };
    
    const currentDate = new Date();
    const yearsAvailable = Object.keys(booksByYear).map(Number).sort((a, b) => b - a);
    const defaultYear = yearsAvailable.includes(currentDate.getFullYear())
        ? currentDate.getFullYear()
        : yearsAvailable[0];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = monthNames[currentMonthIndex];
    
    let selectedYear = defaultYear;
    let selectedMonth = currentMonth;
    
    const yearButtonsContainer = document.getElementById('year-buttons');
    const monthButtonsContainer = document.getElementById('month-buttons');
    const monthSelectorLabel = document.getElementById('month-selector-label');
    
    // Build year buttons (2025 Reads, 2026 Reads, etc.)
    if (yearButtonsContainer) {
        Object.keys(booksByYear).sort().forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'year-btn';
            btn.textContent = `${year} Reads`;
            btn.dataset.year = year;
            if (parseInt(year) === selectedYear) btn.classList.add('active');
            btn.addEventListener('click', () => {
                document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedYear = parseInt(btn.dataset.year);
                updateMonthLabel();
                renderMonthButtons();
                displayBook(selectedYear, selectedMonth);
            });
            yearButtonsContainer.appendChild(btn);
        });
    }
    
    function updateMonthLabel() {
        if (monthSelectorLabel) monthSelectorLabel.textContent = `${selectedYear} — Select Month`;
    }
    
    function renderMonthButtons() {
        if (!monthButtonsContainer) return;
        monthButtonsContainer.innerHTML = '';
        const yearData = booksByYear[selectedYear];
        if (!yearData) return;
        
        monthNames.forEach(month => {
            const btn = document.createElement('button');
            btn.className = 'month-btn';
            btn.textContent = month;
            btn.dataset.month = month;
            if (month === selectedMonth) btn.classList.add('active');
            btn.addEventListener('click', () => {
                document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMonth = btn.dataset.month;
                displayBook(selectedYear, selectedMonth);
            });
            monthButtonsContainer.appendChild(btn);
        });
    }
    
    function displayBook(year, month) {
        const yearData = booksByYear[year];
        if (!yearData) return;
        const book = yearData[month];
        if (!book) return;
        
        const monthTitle = document.getElementById('book-month-title');
        const bookTitle = document.getElementById('book-title');
        const bookTitleSmall = document.getElementById('book-title-small');
        const bookAuthor = document.getElementById('book-author');
        const bookAuthorSmall = document.getElementById('book-author-small');
        const bookRating = document.getElementById('book-rating');
        const bookDescription = document.getElementById('book-description');
        const bookTags = document.getElementById('book-tags');
        
        if (monthTitle) monthTitle.textContent = `${month} ${year} Book of the Month`;
        if (bookTitle) bookTitle.textContent = book.title;
        if (bookTitleSmall) bookTitleSmall.textContent = book.title;
        if (bookAuthor) bookAuthor.textContent = book.author === '—' ? '' : `By ${book.author}`;
        if (bookAuthorSmall) bookAuthorSmall.textContent = book.author;
        
        if (bookRating) {
            if (book.rating > 0) {
                const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
                bookRating.innerHTML = `<span class="stars">${stars}</span>`;
            } else {
                bookRating.innerHTML = '';
            }
        }
        
        if (bookDescription) bookDescription.textContent = book.description;
        if (bookTags) bookTags.innerHTML = book.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }
    
    updateMonthLabel();
    renderMonthButtons();
    displayBook(selectedYear, selectedMonth);
});
