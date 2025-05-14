import OrderSummary from "@/app/(profile)/checkout/components/OrderSummary";

export default {
    common: {
        home: "Home",
        about: "About",
        guest: "Guest",
        products: "Products",
        blogs: "Blogs",
        contact: "Contact",
        cart: "Cart",
        checkout: "Checkout",
        account: "Account",
        login: "Login",
        orders: "My orders",
        info: "Info",
        setting: "Setting",
        register: "Register",
        logout: "Logout",
        chooseLanguage: "Choose Language",
        chooseCurrency: "Choose Currency",
        language: {
            english: "English",
            vietnamese: "Vietnamese"
        },
        currency: {
            vnd: "Vietnam (VND ₫)",
            cad: "Canada (CAD $)",
            usd: "United States (USD $)",
            eur: "Europe (EUR €)",
            gbp: "United Kingdom (GBP £)",
        }
    },
    loginPageText: {
        title: "Welcome back",
        form: {
            email: {
                label: "Email",
                placeholder: "email@example.com"
            },
            password: {
                label: "Password",
                placeholder: "••••••••",
                forgotPassword: "Forgot password?"
            },
            rememberMe: "Remember me",
            submitButton: {
                default: "Login",
                loading: "Processing..."
            }
        },
        links: {
            register: {
                text: "Don't have an account?",
                action: "Sign up now"
            }
        },
        notifications: {
            invalidCredentials: "Incorrect email or password"
        },
        loadingIndicator: {
            ariaLabel: "Loading"
        },
        oauth: {
            google: {
                label: "Sign in with Google",
                divider: "Or sign in with Email"
            }
        },
        logo: {
            altText: "Company Logo"
        },
        loginSuccess: "Login successful",
        loginError: "Login error"
    },
    registerPage: {
        title: 'Create a new account',
        subtitle: 'Sign up to experience our services',
        fullName: 'Full Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        placeholder: {
            fullName: 'John Doe',
            email: 'email@example.com',
            password: '••••••••',
            confirmPassword: '••••••••'
        },
        strength: {
            0: 'Weak password',
            1: 'Weak password',
            2: 'Medium strength',
            3: 'Strong password',
            4: 'Very strong password'
        },
        terms: {
            label: 'I agree to the',
            terms: 'Terms of Service',
            and: 'and',
            privacy: 'Privacy Policy',
            suffix: 'of the service'
        },
        submit: {
            default: 'Sign Up',
            loading: 'Processing...'
        },
        loginPrompt: {
            text: 'Already have an account?',
            link: 'Log In'
        },
        errorMessages: {
            fullName: {
                required: 'Full name is required'
            },
            email: {
                required: 'Email is required',
                invalid: 'Invalid email address'
            },
            password: {
                required: 'Password is required',
                minLength: 'Password must be at least 8 characters long'
            },
            confirmPassword: {
                mismatch: 'Passwords do not match'
            }
        },
        notification: {
            success: "Registration successful!",
            error: "Registration failed. Please try again later or check your input.",
            existedEmail: "Registration failed. This email is already in use."
        }
    },
    navbar: {
        message1: "Supporting local farmers & sustainable harvesting.",
        message2: "Eco-friendly packaging for a better planet.",
        message3: "Explore the Spagyric process.",
        message4: "Free shipping on orders over 1,000,000 VND.",
        learn: "Learn",
        blog: "Blog",
        about: "Our process",
        search: "Search",
        searchPlaceholders: ["Search...", "Products...", "Blogs...", "Explore..."],
        marquee: {
            message1: "Spagyric - where the essence of herbs is reborn",
            message2: "The essence of Vietnam's botanicals, pure in every drop",
            message3: "Proudly Vietnamese Owned & Operated",
            message4: "Thank you for visiting!",
        },
        shop: "Shop",
        shopNow: "Shop now",
        seeMore: 'See more',
        learnMore: 'Learn more',
    },
    banner: {
        welcome1: "Welcome to Herbalism",
        welcome2: "",
        description1: "Where pure botanicals and ancient alchemy come together. Each creation is a refined expression of nature’s energy and beauty, crafted with care to honor the living essence of plants, fungi, and minerals.",
        descroption2: "Our offerings embody the beauty and miraculous strength of plants, fungi, and minerals—extracted through ancient alchemical traditions that preserve the sacred vitality of nature.",
        descroption3: "Every product is a living expression of the Earth's wisdom, crafted to elevate your well-being through the purest forms of botanical power.",
        button: "Shop now"
    },
    homeVideoBanner1: {
        title: "Alchemically Enhanced",
        description1: "With attention and intention in every detail, Herbalism's extracts hold an incredible potency and are highly bioavailable.",
        description2: "Through a propietary extraction method and perfectly sourced plants, Herbalism's Spagyric products contain unmatched bioactive compounds.",
        button: "See more"
    },
    homeImageBanner1: {
        title: "Spagyrics: The Old New Standard",
        description1: "We use triple extraction methodology, ensuring that our products harness the full therapeutic potential of the plant. The synergy created by triple extraction results in a product that offers a potent representation of the plant's beneficial properties, making it a preferred choice for those seeking the utmost efficacy in herbal formulations.",
        description2: "",
    },
    hero: {
        title: "Welcome to Our Website",
        subtitle: "Discover amazing products and deals.",
        button: "Shop Now"
    }, cartSidebar: {
        header: {
            title: "Your Cart",
            itemCount: (count: number) => `${count}`,
        },
        emptyCart: {
            title: "Your cart is empty",
            description: "Add some products and come back here",
            continueShopping: "Continue Shopping",
        },
        cartItem: {
            sizeLabel: "Size:",
            remove: "Remove",
            decrease: "Decrease",
            increase: "Increase",
        },
        summary: {
            subtotal: "Subtotal",
            shippingFee: "Shipping Fee",
            freeShipping: "Free",
            total: "Total",
            checkoutButton: "Checkout Now",
            continueShoppingButton: "Continue Shopping",
        },
        relatedProducts: {
            title: "Related Products",
        },
    },
    collections: {
        title: "The Revival of Botanical Wisdom",
        description:
            "At Herbalism, we blend modern techniques with ancient traditions to create pure, powerful herbal remedies—crafted with care, clarity, and a deep respect for nature.",
        learnMore: "Learn More",
        collection: "Wellness Collections",
        button: "Learn more",
        subtitle: "Wellness Collections",
        items: {
            immunity: { label: "Immunity", icon: "⚖️" },
            stressSupport: { label: "Stress Support", icon: "✨" },
            relaxSleep: { label: "Relax + Sleep", icon: "🛌" },
            mindMood: { label: "Mind + Mood", icon: "🌟" },
            energyBoost: { label: "Energy Boost", icon: "⚡" },
            gutHealth: { label: "Gut Health", icon: "🌱" }
        }
    },
    featured: {
        title: "Discover Your Path to Wellness",
        subtitle:
            "Experience the transformative power of herbal medicine with our carefully crafted products.",
        learnMore: "Learn More"
    },
    newProduct: {
        title: "New Product",
        subtitle: "Cultivate a Fresh Start",
        description:
            "Explore gentle cleansing formulas that will leave you feeling revitalized and glowing from within.",
        button: "SHOP NOW"
    },
    features: {
        spinningWords: "Herbalism - Nature & Wellness",
        heading: "Herbalism - Nature & Wellness",
        subheading: "The Herbalism Difference",
        description:
            "The health of our customers, community, and planet is at the heart of what we do. Each day, we align with our core values to continuously improve our business practices and make choices that minimize our footprint and maximize our impact.",
        ingredients: {
            icon: "🌱",
            title: "Fruiting Body Focus",
            description:
                "We extract only from the fruiting body, avoiding grain-grown mycelium and unnecessary starch fillers."
        },
        quality: {
            icon: "⭐",
            title: "Ethically Sourced",
            description:
                "We directly connect with producers, carefully verify origins, and ensure fair compensation throughout the supply chain."
        },
        formulated: {
            icon: "🔍",
            title: "Spagyric Process",
            description:
                "Our spagyric method reunites the plant’s spirit (ethanol extract), soul (essential oils), and body (mineral salts)."
        },
        community: {
            icon: "🤝",
            title: "Glycerin-Based Remedies",
            description:
                "We extract with ethanol to capture all compounds, then remove it by distillation and replace it with vegetable glycerin."
        }
    },
    businessForGood: {
        title: "Partner for community",
        description: "We are proud to cooperate with organizations and partners committed to bringing positive value to the community."
    },
    productCollections: {
        title: "Product Collections",
        categories: {
            topSellers: "Top Sellers",
            mushrooms: "Mushrooms",
            herbalLattes: "Herbal Lattes",
            artisanTeas: "Artisan Teas",
            tinctureBlends: "Tincture Blends"
        }
    },
    rewards: {
        title: "Customer Rewards",
        description:
            "Start earning points with every purchase and redeem for future discounts and more!",
        button: "GET STARTED"
    },
    shipping: {
        title: "FREE SHIPPING",
        description: "Orders over 1.000.000 VNĐ qualify for free shipping within Canada."
    },
    customerService: {
        title: "CUSTOMER SERVICE",
        description: "Talk to a real person, call us at 1-844-871-4054."
    },
    referFriend: {
        title: "REFER A FRIEND",
        description: "Earn points for every purchase and redeem discounts."
    },
    findUs: {
        title: "FIND US IN STORE",
        description: "Browse our retail locations across Canada."
    },
    newsletter: {
        heading: "Join Our Community",
        subtitle:
            "Stay connected with herbal education, wellness insights, and exclusive offers.",
        placeholder: "Enter your email address"
    },
    shop: {
        hideFilters: "Hide Filters",
        searchPlaceholder: "Search products...",
        sortBy: "Sort by:",
        featured: "Featured",
        price_low: "Price: Low to High",
        price_high: "Price: High to Low",
        rating: "Highest Rated",
        newest: "Newest Arrivals",
        filterProducts: "Filter Products",
        productType: "Product Type",
        productTypes: {
            herbal: "Herbal",
            tinctures: "Tinctures",
            teas: "Teas",
            extracts: "Extracts",
            balms: "Balms"
        },
        wellnessNeed: "Wellness Need",
        wellnessNeeds: {
            immunity: "Immunity",
            digestive: "Digestive",
            stressrelief: "Stress Relief",
            sleep: "Sleep",
            energy: "Energy",
            detox: "Detox"
        },
        productForm: "Product Form",
        productForms: {
            capsules: "Capsules",
            powders: "Powders",
            liquid: "Liquid",
            tablets: "Tablets",
            creams: "Creams"
        },
        priceRange: "Price Range",
        applyFilters: "Apply Filters",
        shopOurProducts: "Shop Our Products",
        noProductsFound: "No products found.",
    },
    about: {
        title: "About us",
        description: "Who We Are & What We Do"
    },
    orders: {
        loadingOrders: 'Loading orders...',
        errorLoadOrders: 'Error loading orders',
        processing: 'Processing...',
        cancelOrder: {
            title: "Cancel Order",
            message: "Are you sure you want to cancel this order? This action cannot be undone.",
            confirm: 'Yes, Cancel Order',
            cancel: "No, Keep Order",
        },
        receiveOrder: {
            title: "Confirm Order Received",
            message: "Have you received this order? Please confirm to complete the order.",
            confirm: 'Yes, I Received It',
            cancel: "Not Yet",
        },
        title: 'My Orders',
        description: 'View and manage your orders',
        orderHistory: 'Order History',
        searchPlaceholder: "Search orders or products...",
        status: {
            all: "All Statuses",
            pending: 'Pending',
            processing: 'Processing',
            shipped: 'Shipped',
            completed: 'Completed',
            cancelled: 'Cancelled'
        },
        newest: 'Newest First',
        oldest: 'Oldest First',
        noOrders: 'No orders found',
        clearFilter: 'Clear filters',
        items: 'Order Items',
        size: 'Size:',
        quantity: 'Qty:',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        total: 'Total',
        shipping: 'Shipping',
        customerInfo: 'Customer infomation',
        name: 'Name:',
        email: 'Email:',
        shippingAddress: 'Shipping Address',
        orderTracking: 'Order #',
        tracking: 'Tracking:',
        cancel: 'Cancel',
        received: 'Confirm received'
    },
    blog: {
        title: "Harmonic Arts Blog",
        description: "Recipes, tips, ideas, and sharing wellness with our community. Come visit our blog and see what the Harmonic Arts team has been up to.",
        readMore: "Read More",

        notFound: "Sorry, we couldn't find that page.",
        notFoundDescription: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        backToHome: "Back",

        valuesDrivenBusiness: {
            title: "What Does it Take to Run a Values-Driven Business?",
            excerpt: "At Harmonic Arts, we continuously strive to balance quality and sustainability with accessibility. Discover what it takes to run a values-driven business.",
            readMore: "READ MORE"
        },

        articles: {
            1: {
                title: "5 Powerful Adaptogenic Herbs to Combat Stress",
                categories: "Health & Wellness",
                description: "Discover how adaptogens like ashwagandha and rhodiola can help your body manage stress and restore balance naturally.",
                author: "DR. SARAH JOHNSON",
                date: "MARCH 15, 2024"
            },
            2: {
                title: "The Science of Meditation: How It Changes Your Brain",
                categories: "Mental Health, Mindfulness",
                description: "Recent neuroscience research reveals how regular meditation can physically alter brain structure and improve cognitive function.",
                author: "MICHAEL CHEN",
                date: "FEBRUARY 28, 2024"
            },
            3: {
                title: "Fermented Foods: Building a Healthier Microbiome",
                categories: "Nutrition, Gut Health",
                description: "Explore the world of kimchi, kefir, and kombucha and learn how these probiotic-rich foods can transform your digestive health.",
                author: "NATALIE WONG",
                date: "JANUARY 10, 2024"
            },
            4: {
                title: "10 Simple Swaps for a Plastic-Free Kitchen",
                categories: "Eco-Friendly Homes, Zero Waste",
                description: "Transform your cooking space with these easy alternatives that reduce plastic waste without sacrificing convenience.",
                author: "EMMA GREENFIELD",
                date: "APRIL 5, 2024"
            },
            5: {
                title: "Solar Power Breakthroughs: What's New in 2024",
                categories: "Renewable Energy, Technology",
                description: "The latest innovations in solar technology that are making renewable energy more efficient and affordable than ever before.",
                author: "JAMES WILSON",
                date: "MARCH 22, 2024"
            },
            6: {
                title: "The Rise of Circular Fashion: Brands Leading the Way",
                categories: "Sustainable Fashion",
                description: "How forward-thinking clothing companies are implementing circular business models to reduce textile waste.",
                author: "SOFIA MARTINEZ",
                date: "FEBRUARY 15, 2024"
            },
            7: {
                title: "The Ethical Dilemmas of Generative AI",
                categories: "Artificial Intelligence, Ethics",
                description: "As AI becomes more sophisticated, we examine the moral questions surrounding its development and implementation.",
                author: "DAVID KIM",
                date: "APRIL 10, 2024"
            },
            8: {
                title: "Mars Colonization: The Challenges Ahead",
                categories: "Space Exploration",
                description: "Scientists reveal the biggest obstacles we must overcome before establishing a permanent human presence on the Red Planet.",
                author: "DR. LISA PARK",
                date: "MARCH 30, 2024"
            },
            9: {
                title: "Protecting Your Digital Identity in 2024",
                categories: "Cybersecurity",
                description: "Essential security practices to safeguard your online presence against increasingly sophisticated cyber threats.",
                author: "MARK ROBERTS",
                date: "JANUARY 25, 2024"
            },
            10: {
                title: "Eco-Conscious Travel: Seeing the World Responsibly",
                categories: "Sustainable Tourism",
                description: "How to minimize your environmental impact while still experiencing the wonders of global travel.",
                author: "ANNABELLE LEE",
                date: "APRIL 8, 2024"
            },
            11: {
                title: "Hidden Food Gems: 5 Underrated Culinary Destinations",
                categories: "Culinary Travel",
                description: "Venture off the beaten path to discover these lesser-known but extraordinary food cultures around the world.",
                author: "CARLOS MENDES",
                date: "MARCH 18, 2024"
            },
            12: {
                title: "Preserving Ancient Traditions in a Modern World",
                categories: "Indigenous Cultures",
                description: "Meet the communities working to maintain their cultural heritage while adapting to contemporary challenges.",
                author: "MARIA GONZALEZ",
                date: "FEBRUARY 5, 2024"
            }
        },

        categories: {
            healthWellness: "Health & Wellness",
            sustainableLiving: "Sustainable Living",
            technologyInnovation: "Technology & Innovation",
            travelCulture: "Travel & Culture"
        }
    },
    product: {
        description: "Description",
        ingredients: "Ingredients",
        recommendedUse: "Recommended Use",
        howToUse: "How to Use",
        rating: "Rating",
        sizeTable: "Size Table",
        sizeGuild: "Size Guide",
        sizes: {
            small: "S: 30ml - Phù hợp cho du lịch",
            medium: "M: 50ml - Kích thước tiêu chuẩn",
            large: "L: 100ml - Tiết kiệm hơn 20%",
            extraLarge: "Extra Large"
        },
        productLeft: "Stock Left",
        outOfOrder: "Out of stock",
        addCart: "Add to cart",
        addToCartSuccess: "Added to cart successfully",
        freeShipping: "Free shipping on orders over 1.000.000 VNĐ",
        quality: "Quality Assurance",
        refundIn30Days: "Refund in 30 days",
        productDetail: "Product Details",
        customerReiviews: "Customer Reviews",
        noReview: "No reviews yet",
        writeAReview: "Write a Review",
        seeAllReviews: "See all * reviews",
        comment: "Comment",
        cancel: "Cancel",
        submit: "Submit",
        addedToCartSuccess: "Added to cart successfully",
        addToCartError: "Error adding to cart",
        relatedProducts: "You also may like"
    },
    customer: {
        title: "What our customers say ",
        description: "We're proud to provide great service and love hearing your feedback."
    },
    searchPage: {
        result: "Search results for",
        found1: "Found",
        found2: "matching results",
        all: "All",
        article: "Article",
        product: "Product",
        read: "Read more",
        see: "View",
        seeAll: "View all",
        noResult: "No result found",
        retry: "Try different keyword"
    },
    footer: {
        contact: "CONTACT",
        legal: "LEGAL",
        enterEmail: "Enter your email address",
        subscribeSuccess: "You're subscribed! We'll keep you updated.",
        join: "Join our community",
        stayConnect: "Stay connected with herbal education, wellness insights, and exclusive offers.",
        description: "The products and information provided through this website have not been evaluated by the Vietnam Ministry of Health (MoH), Therapeutic Goods Administration (TGA), Food and Drug Administration of the USA (FDA), or Herbalism Ltd, and are not intended to diagnose, treat, cure or prevent disease. Any information on this website, or on any of our product labels or packaging, is for informational purposes only and is not intended as a substitute for advice from your primary healthcare provider. Please consult a healthcare professional before use, and regarding any medical or health-related diagnosis or treatment options. The products available on this website contain a variety of concentrated plant extracts. Ensure you do not have any allergies to any ingredients before using.",
        info: {
            shippingPolicy: "Delivery Policy",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service"
        },
        copyright:
            "© 2025 Herbalism Ltd all rights reserved."
    }, paymentPage: {
        common: {
            backButton: "Back",
            continueButton: "Continue",
            completeOrderButton: "Complete Order",
            editButton: "Edit",
            changeButton: "Change",
            securePayment: "Secure & Safe Payment",
            applyButton: "Apply",
            voucherPlaceholder: "Enter voucher code...",
        },

        pageTitle: "Checkout",

        progressSteps: {
            step1: "Information",
            step2: "Payment",
            step3: "Confirmation",
        },

        addressStep: {
            title: "Shipping Information",
            emailLabel: "Email",
            emailPlaceholder: "email@example.com",
            phoneLabel: "Phone Number",
            phonePlaceholder: "0901 234 567",
            newsletterCheckbox: "Receive confirmation email",
            addressLabel: "Shipping Address",
            newAddressOption: "Use a new address",
            savedAddressOption: "Use saved address",
            selectAddressPlaceholder: "Select an address",

            countryLabel: "Country",
            countryPlaceholder: "Select country",
            firstNameLabel: "First Name",
            firstNamePlaceholder: "First Name",
            lastNameLabel: "Last Name",
            lastNamePlaceholder: "Last Name",
            addressPlaceholder: "Enter address",
            apartmentLabel: "Apartment, building",
            cityLabel: "City",
            cityPlaceholder: "Enter city",
            provinceLabel: "Province/City",
            provincePlaceholder: "Select province/city",
            zipCodeLabel: "Postal Code",
            zipCodePlaceholder: "Enter postal code",
            noteLabel: "Note",
            notePlaceholder: "Enter some note"
        },

        paymentStep: {
            title: "Payment Method",
            creditCard: {
                title: "Credit Card",
                cardNumberLabel: "Card Number",
                cardNumberPlaceholder: "1234 5678 9012 3456",
                expiryDateLabel: "Expiry Date",
                expiryDatePlaceholder: "MM/YY",
                cvcLabel: "Security Code",
                cvcPlaceholder: "CVC",
                nameLabel: "Cardholder Name",
                namePlaceholder: "NGUYEN VAN A",
            },
            paypal: {
                title: "PayPal",
                noticeTitle: "You will be redirected to PayPal",
                noticeDescription: "After clicking 'Complete Payment', you will be redirected to PayPal to finish the transaction.",
            },
            momo: {
                title: "MoMo Wallet",
                noticeTitle: "You will be redirected to MoMo",
                noticeDescription: "After clicking 'Complete Payment', the MoMo app will open for you to confirm the payment.",
            },
            cod: {
                title: "Cash on Delivery",
                noticeTitle: "Pay upon delivery",
                noticeDescription: "Make payment when you receive the goods.",
            },
            bank: {
                title: "Bank Transfer",
                noticeTitle: "Pay upon delivery",
                noticeDescription: "Scan this QR for bank transfer",
            }
        },

        reviewStep: {
            title: "Order Confirmation",
            shippingTitle: "Shipping Information",
            paymentTitle: "Payment Method",
            infoLabels: {
                fullName: "Full Name:",
                phone: "Phone:",
                email: "Email:",
                address: "Address:",
                province: "Province:",
                zipCode: "Zip code:",
                country: "Country:",
                paymentMethod: "Method:",
                creditCard: "Credit Card: ",
            },
            missingInfo: "No information provided",
        },

        orderSummary: {
            title: "Your Order",
            subtotalLabel: "Subtotal:",
            shippingLabel: "Shipping Fee:",
            discountLabel: "Discount Code:",
            discount: "Discount",
            totalLabel: "Total:",
            freeShipping: "Free",
            orderInfoTitle: "Order Information",
            infoLabels: {
                email: "Email:",
                phone: "Phone:",
                address: "Address:",
                paymentMethod: "Method:",
                size: "Size:",
                amount: "Quantity:"
            },
            missingInfo: "Not entered",
            notSelected: "Not selected",
        },

        paymentMethods: [
            // {
            //     id: 'credit-card',
            //     name: 'Credit Card',
            //     icon: ''
            // },
            // {
            //     id: 'paypal',
            //     name: 'PayPal',
            //     icon: ''
            // },
            // {
            //     id: 'momo',
            //     name: 'MoMo Wallet',
            //     icon: ''
            // },
            {
                id: 'bank',
                name: 'Bank Transfer',
                icon: ''
            },
            {
                id: 'cod',
                name: 'Cash on Delivery',
                icon: ''
            }
        ],

        provinces: [
            "An Giang",
            "Ba Ria - Vung Tau",
            "Bac Lieu",
            "Bac Giang",
            "Bac Kan",
            "Bac Ninh",
            "Ben Tre",
            "Binh Duong",
            "Binh Dinh",
            "Binh Phuoc",
            "Binh Thuan",
            "Ca Mau",
            "Cao Bang",
            "Can Tho",
            "Da Nang",
            "Dak Lak",
            "Dak Nong",
            "Dien Bien",
            "Dong Nai",
            "Dong Thap",
            "Gia Lai",
            "Ha Giang",
            "Ha Nam",
            "Hanoi",
            "Ha Tinh",
            "Hai Duong",
            "Hai Phong",
            "Hau Giang",
            "Hoa Binh",
            "Hung Yen",
            "Khanh Hoa",
            "Kien Giang",
            "Kon Tum",
            "Lai Chau",
            "Lang Son",
            "Lao Cai",
            "Lam Dong",
            "Long An",
            "Nam Dinh",
            "Nghe An",
            "Ninh Binh",
            "Ninh Thuan",
            "Phu Tho",
            "Phu Yen",
            "Quang Binh",
            "Quang Nam",
            "Quang Ngai",
            "Quang Ninh",
            "Quang Tri",
            "Soc Trang",
            "Son La",
            "Tay Ninh",
            "Thai Binh",
            "Thai Nguyen",
            "Thanh Hoa",
            "Thua Thien Hue",
            "Tien Giang",
            "Ho Chi Minh City",
            "Tra Vinh",
            "Tuyen Quang",
            "Vinh Long",
            "Vinh Phuc",
            "Yen Bai"
        ],

        countries: [
            { value: "VN", label: "Vietnam" },
            { value: "US", label: "United States" },
            { value: "CA", label: "Canada" },
            { value: "UK", label: "United Kingdom" },
            { value: "JP", label: "Japan" },
            { value: "KR", label: "South Korea" },
            { value: "OTHER", label: "Other countries" },
        ]
    },
    orderProcessingTranslations: {
        pageTitle: {
            processing: "Order is Being Created",
            complete: "Order Created Successfully!"
        },
        statusMessages: {
            processing: "We are currently processing your order. This usually takes just a few minutes to complete.",
            complete: "Your order has been successfully created and is ready for the next steps."
        },
        errorMessages: {
            title: "Order Processing Error",
            createFailed: "We encountered an issue while creating your order. Please try again or contact support if the problem persists.",
            timeout: "Failed to receive payment data. Please try again."
        },
        timeEstimation: {
            processing: "Estimated processing time: ",
            complete: "Your order has been processed successfully!"
        },
        steps: [
            { label: "Create Order", icon: "📋" },
            { label: "Confirm Payment", icon: "💳" },
            { label: "Complete", icon: "✅" }
        ],
        orderInfo: {
            orderNumber: "Order Number",
            orderDate: "Order Date",
            paymentMethod: "Payment Method"
        },
        buttons: {
            continueShopping: "Continue Shopping",
        },
        loadingIndicator: "10 - 15 seconds",
        tryAgain: "Try again"
    },
    customLoadingTranslations: {
        loadingMessages: {
            initializing: "Initializing...",
            loadingData: "Loading data...",
            almostDone: "Almost done...",
            redirecting: "Redirecting..."
        },
        statusText: {
            loading: "Loading",
            ready: "Ready!"
        },
        animation: {
            typingDots: "..."
        }
    },
    ourProcessData: {
        hero: {
            title: 'Our Process',
            subtitle: 'Spagyric – The Sacred Alchemy of Healing',
            description:
                'In the rich tradition of Western alchemy, Spagyric is more than a method of herbal preparation—it is a profound philosophical symbol of transformation—of matter, soul, and the human being.',
        },
        paracelsus: {
            title: 'Paracelsus',
            badge: 'The Alchemist',
            imageUrl:
                'https://merian-alchemie.ub.uni-frankfurt.de/wp-content/uploads/Rubens-Paracelsus_Beitrag-Esposito-1200x1722.jpg',
            paragraphs: [
                'Paracelsus (1493–1541), born Philippus Aureolus Theophrastus Bombastus von Hohenheim, was a Swiss-German alchemist, physician, astrologer, botanist, and philosopher.',
                'A revolutionary thinker of the Renaissance, he is regarded not only as the father of Spagyric alchemy, but also as a pioneer of iatrochemistry—a precursor to modern pharmaceutical science.',
                'Paracelsus introduced a holistic view of medicine, one that treated illness not as an isolated symptom, but as an imbalance of the whole being—requiring healing at the root.',
            ],
        },
        origins: {
            title: 'The Alchemical Origins of Spagyric',
            spagyricRoots: [
                { term: 'Spao', definition: 'to separate' },
                { term: 'Ageiro', definition: 'to recombine' },
            ],
            description1:
                'This principle, "separate – purify – reunite," lies at the heart of Spagyric. It reflects the timeless alchemical axiom:',
            quote: '"Solve et Coagula" – dissolve to recombine.',
            description2:
                'In Spagyric, plants are broken down into their three fundamental components—Spirit, Soul, and Body—each one purified, then reunited to create an Elixir that embodies the complete essence of the plant, physically and energetically.',
        },
        principles: {
            title: 'The Three Sacred Principles',
            items: [
                {
                    title: 'Salt',
                    description: 'The Body: structure and mineral foundation',
                    icon: 'Sparkles',
                },
                {
                    title: 'Sulfur',
                    description: 'The Soul: essence, emotions, and inner fire',
                    icon: 'Flame',
                },
                {
                    title: 'Mercury',
                    description: 'The Spirit: the volatile force, life and consciousness',
                    icon: 'Droplets',
                },
            ],
        },
        steps: {
            title: 'The Classical Spagyric Process',
            items: [
                {
                    step: 1,
                    title: 'Fermentation & Distillation: Extracting the Spirit',
                    description:
                        "The plant matter is fermented to produce alcohol, then distilled to obtain the plant's \"living spirit\"—its vital essence.",
                },
                {
                    step: 2,
                    title: 'Maceration & Extraction: Extracting the Soul',
                    description:
                        'The leftover plant material is macerated in the alcohol to release its soul—the essential oils, resins, and subtle compounds—followed by careful filtration.',
                },
                {
                    step: 3,
                    title: 'Calcination: Purifying the Body',
                    description:
                        'The plant residue is incinerated at high heat into white ash, then repeatedly washed and purified to yield mineral salts—the body of the plant.',
                },
                {
                    step: 4,
                    title: 'Recombination: Coagula – uniting all elements',
                    description:
                        'The purified salts (Body), essential extracts (Soul), and distilled alcohol (Spirit) are finally recombined into a unified Spagyric Elixir, embodying the full spectrum...',
                },
            ],
        },
        transformation: {
            title: "Spagyric as a Sacred Path of Inner Transformation",
            intro: "To a true alchemist, crafting a Spagyric remedy is not just making medicine—it is a sacred ritual. Every stage of the process mirrors an inner transformation:",
            steps: [
                {
                    number: 1,
                    title: "Extracting the essence",
                    description: "is an act of devotion to nature's purity"
                },
                {
                    number: 2,
                    title: "Burning the plant's residue",
                    description: "symbolizes letting go of the old self, the ego"
                },
                {
                    number: 3,
                    title: "Recombining the elements",
                    description: "reflects the soul's rebirth—a higher, more luminous state of being"
                }
            ],
            teachings: [
                "Nothing is wasted. Even ashes contain wisdom.",
                "The dark serves the light. The separation is necessary for wholeness."
            ]
        },

        final: {
            icon: "Leaf",
            title: "A Gift from Earth and Universe",
            description: "Spagyric is more than herbal medicine—it's a journey of unity between human, nature, and cosmos. It reconnects us to the elemental and the divine."
        }
    }
}
