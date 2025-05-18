// vi.ts
export default {
    common: {
        home: "Trang chủ",
        about: "Giới thiệu",
        products: "Sản phẩm",
        guest: "Khách",
        blogs: "Bài viết",
        contact: "Liên hệ",
        cart: "Giỏ hàng",
        checkout: "Thanh toán",
        account: "Tài khoản",
        login: "Đăng nhập",
        orders: "Đơn hàng của tôi",
        info: "Thông tin",
        setting: "Cài đặt",
        register: "Đăng ký",
        logout: "Đăng xuất",
        chooseLanguage: "Chọn ngôn ngữ",
        chooseCurrency: "Chọn loại tiền tệ",
        language: {
            english: "Tiếng Anh",
            vietnamese: "Tiếng Việt"
        },
        currency: {
            vnd: "Việt Nam (VNĐ ₫)",
            cad: "Canada (CAD $)",
            usd: "Hoa Kỳ (USD $)",
            eur: "Châu Âu (EUR €)",
            gbp: "Vương quốc Anh (GBP £)"
        }
    },
    loginPageText: {
        title: "Chào mừng trở lại",
        form: {
            email: {
                label: "Email",
                placeholder: "email@example.com"
            },
            password: {
                label: "Mật khẩu",
                placeholder: "••••••••",
                forgotPassword: "Quên mật khẩu?"
            },
            rememberMe: "Ghi nhớ đăng nhập",
            submitButton: {
                default: "Đăng nhập",
                loading: "Đang xử lý..."
            }
        },
        links: {
            register: {
                text: "Chưa có tài khoản?",
                action: "Đăng ký ngay"
            }
        },
        notifications: {
            invalidCredentials: "Sai tài khoản hoặc mật khẩu"
        },
        loadingIndicator: {
            ariaLabel: "Loading"
        },
        oauth: {
            google: {
                label: "Đăng nhập với Google",
                divider: "Hoặc đăng nhập với Email"
            }
        },
        logo: {
            altText: "Company Logo"
        },
        loginSuccess: "Đăng nhập thành công",
        loginError: "Lỗi đăng nhập"
    },
    registerPage: {
        title: 'Tạo tài khoản mới',
        subtitle: 'Đăng ký để trải nghiệm dịch vụ của chúng tôi',
        fullName: 'Họ và tên',
        email: 'Email',
        password: 'Mật khẩu',
        confirmPassword: 'Xác nhận mật khẩu',
        placeholder: {
            fullName: 'Nguyễn Văn A',
            email: 'email@example.com',
            password: '••••••••',
            confirmPassword: '••••••••'
        },
        strength: {
            0: 'Mật khẩu yếu',
            1: 'Mật khẩu yếu',
            2: 'Mật khẩu trung bình',
            3: 'Mật khẩu mạnh',
            4: 'Mật khẩu rất mạnh'
        },
        terms: {
            label: 'Tôi đồng ý với',
            terms: 'Điều khoản',
            and: 'và',
            privacy: 'Chính sách',
            suffix: 'của dịch vụ'
        },
        submit: {
            default: 'Đăng ký',
            loading: 'Đang xử lý...'
        },
        loginPrompt: {
            text: 'Đã có tài khoản?',
            link: 'Đăng nhập'
        },
        errorMessages: {
            fullName: {
                required: 'Họ tên không được để trống'
            },
            email: {
                required: 'Email không được để trống',
                invalid: 'Email không hợp lệ'
            },
            password: {
                required: 'Mật khẩu không được để trống',
                minLength: 'Mật khẩu phải có ít nhất 8 ký tự'
            },
            confirmPassword: {
                mismatch: 'Mật khẩu xác nhận không khớp'
            }
        },
        notification: {
            success: "Đăng ký thành công!",
            error: "Đăng ký thất bại. Vui lòng thử lại sau hoặc kiểm tra thông tin đã nhập.",
            existedEmail: "Đăng ký thất bại. Mail này đã được sử dụng."
        }
    },
    navbar: {
        message1: "Spagyric nơi tinh hoa thảo dược được tái sinh",
        message2: "Tinh hoa dược liệu châu Á, tinh khiết trong từng giọt",
        message3: "Công thức thầy thuốc thảo dược cho sức khỏe tối ưu.",
        message4: "Đảm bảo chất lượng trong mỗi đơn hàng.",
        learn: "Tìm hiểu",
        blog: "Blog",
        about: "Hành trình chiết xuất",
        search: "Tìm kiếm",
        searchPlaceholders: ["Tìm kiếm...", "Sản phẩm...", "Bài viết...", "Khám phá..."],
        marquee: {
            message1: "Spagyric nơi tinh hoa thảo dược được tái sinh",
            message2: "Tinh hoa dược liệu châu Á, tinh khiết trong từng giọt",
            message3: "Khám phá các sản phẩm tuyệt vời của chúng tôi!",
            message4: "Cảm ơn bạn đã ghé thăm!"
        },
        shop: "Cửa hành",
        shopNow: "Mua ngay",
        seeMore: 'Xem thêm',
        learnMore: 'Xem thêm',
    },
    banner: {
        welcome1: "Chào mừng bạn đến với Herbalism",
        welcome2: "",
        description1: "Nơi hội tụ những sản phẩm mang năng lượng vượt trội, hoàn toàn hữu cơ.",
        descroption2: "Các sản phẩm của chúng tôi chứa đựng vẻ đẹp và sức mạnh kỳ diệu từ thực vật, nấm và khoáng chất, được chiết xuất theo phương pháp giả kim thuật cổ xưa, giữ trọn vẹn sự sống linh thiêng của thiên nhiên.",
        descroption3: "Sự hồi sinh của dược liệu Tại Herbalism, chúng tôi kết hợp hài hòa giữa kỹ thuật hiện đại và phương pháp chiết xuất cổ xưa đã được truyền lại qua bao thế hệ, chúng tôi tạo ra những dòng chế phẩm Spagyric tinh khiết. Mỗi sản phẩm là kết quả của sự tận tâm, tinh tế và cam kết tuyệt đối về chất lượng.",
        button: "Xem ngay"
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
        title: "Chào mừng đến với trang web của chúng tôi",
        subtitle: "Khám phá các sản phẩm và ưu đãi tuyệt vời.",
        button: "Mua ngay"
    },
    collections: {
        title: "Từng giọt tinh chất kế thừa tinh hoa cổ xưa",
        description:
            "Sự hồi sinh của dược liệu Tại Herbalism, chúng tôi kết hợp hài hòa giữa kỹ thuật hiện đại và phương pháp chiết xuất cổ xưa đã được truyền lại qua bao thế hệ, chúng tôi tạo ra những dòng chế phẩm Spagyric tinh khiết. Mỗi sản phẩm là kết quả của sự tận tâm, tinh tế và cam kết tuyệt đối về chất lượng.",
        learnMore: "Tìm hiểu thêm",
        collection: "Bộ sưu tập sức khỏe",
        button: "Tìm hiểu thêm",
        subtitle: "Bộ Sưu Tập Sức Khỏe",
        items: {
            immunity: { label: "Miễn dịch", icon: "⚖️" },
            stressSupport: { label: "Hỗ trợ căng thẳng", icon: "✨" },
            relaxSleep: { label: "Thư giãn + Ngủ", icon: "🛌" },
            mindMood: { label: "Tâm trí + Tâm trạng", icon: "🌟" },
            energyBoost: { label: "Tăng năng lượng", icon: "⚡" },
            gutHealth: { label: "Sức khỏe đường ruột", icon: "🌱" }
        }
    },
    featured: {
        title: "Khám phá con đường sức khỏe của bạn",
        subtitle:
            "Trải nghiệm sức mạnh chuyển hóa của y học thảo dược với các sản phẩm được chế tác tỉ mỉ.",
        learnMore: "Tìm hiểu thêm"
    },
    newProduct: {
        title: "Sản phẩm mới",
        subtitle: "Nuôi dưỡng khởi đầu mới",
        description:
            "Khám phá công thức làm sạch nhẹ nhàng giúp bạn cảm thấy tràn đầy sức sống và rạng rỡ từ bên trong.",
        button: "MUA NGAY"
    },
    features: {
        spinningWords: "Herbalism - Triết học và thiên nhiên",
        heading: "Sản phẩm đến từ Herbalism",
        subheading: "Điểm khác biệt của Herbalism",
        description:
            "Sức khỏe của khách hàng, cộng đồng và hành tinh là trọng tâm của chúng tôi. Mỗi ngày, chúng tôi gắn kết với các giá trị cốt lõi để liên tục cải thiện hoạt động và giảm thiểu tác động, đồng thời tối đa hóa lợi ích.",
        ingredients: {
            icon: "🌱",
            title: "Tập trung vào quả thể",
            description:
                "Chúng tôi chỉ chiết xuất từ phần giàu dưỡng chất nhất – nguồn tinh túy đậm đặc và hoàn toàn loại bỏ những thành phần không cần thiết."
        },
        quality: {
            icon: "⭐",
            title: "Nguồn nguyên liệu chất lượng cao",
            description:
                "Chúng tôi trực tiếp kết nối với nhà sản xuất, kiểm chứng nghiêm ngặt nguồn gốc và đảm bảo sự công bằng xuyên suốt chuỗi cung ứng."
        },
        formulated: {
            icon: "🔍",
            title: "Quy trình Spagyric",
            description:
                "Phương pháp Spagyric của chúng tôi tái hợp ba yếu tố cốt lõi của cây: tinh thần (hoạt chất chiết xuất bằng ethanol), linh hồn (tinh dầu) và thể xác (muối khoáng)."
        },
        community: {
            icon: "🤝",
            title: "Chế phẩm nền glycerin",
            description:
                "Chúng tôi chiết xuất toàn bộ hoạt chất bằng ethanol, sau đó loại bỏ hoàn toàn qua chưng cất chân không và thay thế bằng glycerin thực vật dịu nhẹ."
        }
    },
    businessForGood: {
        title: "Đối tác vì cộng đồng",
        description: "Chúng tôi tự hào hợp tác với những tổ chức và đối tác cam kết mang lại giá trị tích cực cho cộng đồng."
    },
    productCollections: {
        title: "Bộ sưu tập sản phẩm",
        categories: {
            topSellers: "Bán chạy nhất",
            mushrooms: "Nấm",
            herbalLattes: "Trà sữa thảo dược",
            artisanTeas: "Trà thủ công",
            tinctureBlends: "Hỗn hợp thuốc nhỏ"
        }
    },
    rewards: {
        title: "Phần thưởng khách hàng",
        description:
            "Bắt đầu tích điểm với mỗi giao dịch và đổi lấy ưu đãi trong tương lai!",
        button: "BẮT ĐẦU"
    },
    shipping: {
        title: "MIỄN PHÍ VẬN CHUYỂN",
        description: "Đơn hàng từ 1.000.000 VNĐ trở lên được miễn phí vận chuyển."
    },
    customerService: {
        title: "DỊCH VỤ KHÁCH HÀNG",
        description: "Nói chuyện với người thật, gọi 1-844-871-4054."
    },
    referFriend: {
        title: "GIỚI THIỆU BẠN BÈ",
        description: "Kiếm điểm cho mỗi giao dịch và đổi lấy ưu đãi."
    },
    findUs: {
        title: "TÌM CHÚNG TÔI TẠI CỬA HÀNG",
        description: "Khám phá các địa điểm bán lẻ của chúng tôi khắp Canada."
    },
    newsletter: {
        heading: "Tham gia cộng đồng của chúng tôi",
        subtitle:
            "Giữ liên lạc với kiến thức thảo dược, thông tin sức khỏe và ưu đãi độc quyền.",
        placeholder: "Nhập địa chỉ email của bạn"
    },
    shop: {
        hideFilters: "Ẩn bộ lọc",
        searchPlaceholder: "Tìm kiếm sản phẩm...",
        sortBy: "Sắp xếp theo:",
        featured: "Nổi bật",
        price_low: "Giá: Tăng dần",
        price_high: "Giá: Giảm dần",
        rating: "Đánh giá",
        newest: "Mới nhất",
        filterProducts: "Lọc sản phẩm",
        productType: "Loại sản phẩm",
        productTypes: {
            herbal: "Thảo dược",
            tinctures: "Cồn thuốc",
            teas: "Trà",
            extracts: "Chiết xuất",
            balms: "Dầu xoa"
        },
        wellnessNeed: "Nhu cầu sức khỏe",
        wellnessNeeds: {
            immunity: "Tăng cường miễn dịch",
            digestive: "Tiêu hóa",
            stressrelief: "Giảm căng thẳng",
            sleep: "Giấc ngủ",
            energy: "Tăng năng lượng",
            detox: "Thải độc"
        },
        productForm: "Dạng sản phẩm",
        productForms: {
            capsules: "Viên nang",
            powders: "Bột",
            liquid: "Dung dịch",
            tablets: "Viên nén",
            creams: "Kem"
        },
        priceRange: "Khoảng giá",
        applyFilters: "Áp dụng bộ lọc",
        shopOurProducts: "Khám phá sản phẩm",
        noProductsFound: "Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn.",
    },
    orders: {
        loadingOrders: 'Đang tải đơn hàng...',
        errorLoadOrders: 'Lỗi khi tải đơn hàng',
        processing: 'Đang xử lý...',
        cancelOrder: {
            title: "Huỷ đơn hàng",
            message: "Bạn có chắc muốn huỷ đơn hàng này không? Hành động này sẽ không thể hoàn tác.",
            confirm: 'Đúng, huỷ đơn hàng',
            cancel: "Không, giữ lại đơn hàng",
        },
        receiveOrder: {
            title: "Xác nhận đã nhận hàng",
            message: "Bạn đã nhận được đơn hàng này chưa? Vui lòng xác nhận để hoàn tất đơn hàng.",
            confirm: 'Đã nhận hàng',
            cancel: "Chưa nhận",
        },
        title: 'Đơn hàng của tôi',
        description: 'Xem và quản lý các đơn hàng của bạn',
        orderHistory: 'Lịch sử đơn hàng',
        paymentStatus: "Trạng thái thanh toán",
        paid: "Đã thanh toán",
        unpaid: "Chưa thanh toán",
        searchPlaceholder: "Tìm kiếm đơn hàng hoặc sản phẩm...",
        status: {
            all: "Tất cả trạng thái",
            pending: 'Chờ xác nhận',
            processing: 'Đang xử lý',
            shipped: 'Đã giao',
            completed: 'Hoàn tất',
            cancelled: 'Đã huỷ'
        },
        newest: 'Mới nhất trước',
        oldest: 'Cũ nhất trước',
        noOrders: 'Không tìm thấy đơn hàng nào',
        clearFilter: 'Xoá bộ lọc',
        items: 'Sản phẩm trong đơn',
        size: 'Kích cỡ:',
        quantity: 'Số lượng:',
        orderSummary: 'Tóm tắt đơn hàng',
        subtotal: 'Tạm tính',
        total: 'Tổng',
        shipping: 'Phí vận chuyển',
        customerInfo: 'Thông tin khách hàng',
        name: 'Tên:',
        email: 'Email:',
        shippingAddress: 'Địa chỉ giao hàng',
        orderTracking: 'Đơn hàng #',
        tracking: 'Mã vận đơn:',
        cancel: 'Huỷ đơn',
        received: 'Xác nhận đã nhận hàng'
    },
    about: {
        title: "Về chúng tôi",
        description: "Chúng tôi là ai và làm gì để tạo ra sự khác biệt.",
    },
    blog: {
        title: "Blog Herbalism",
        description: "Công thức, mẹo vặt, ý tưởng và chia sẻ sức khỏe với cộng đồng. Ghé thăm blog của chúng tôi để xem đội ngũ Herbalism đang làm gì.",
        readMore: "Xem thêm",

        notFound: "Không tìm thấy bài viết này",
        notFoundDescription: "Xin lỗi, bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ.",
        backToHome: "Quay về",

        valuesDrivenBusiness: {
            title: "Điều gì cần để điều hành một doanh nghiệp dựa trên giá trị?",
            excerpt: "Tại Herbalism, chúng tôi luôn nỗ lực cân bằng giữa chất lượng, tính bền vững và khả năng tiếp cận. Khám phá điều gì tạo nên một doanh nghiệp dựa trên giá trị.",
            readMore: "XEM THÊM"
        },
        articles: {
            1: {
                title: "5 loại thảo mộc thích nghi giúp chống lại căng thẳng",
                categories: "Sức khỏe & Thể chất",
                description: "Khám phá cách các loại thảo mộc như ashwagandha và rhodiola giúp cơ thể bạn thích nghi với căng thẳng và phục hồi cân bằng một cách tự nhiên.",
                author: "BÁC SĨ SARAH JOHNSON",
                date: "15 THÁNG 3, 2024"
            },
            2: {
                title: "Khoa học về thiền: Nó thay đổi não bộ của bạn như thế nào",
                categories: "Sức khỏe tâm thần, Chánh niệm",
                description: "Các nghiên cứu thần kinh gần đây tiết lộ thiền định thường xuyên có thể thay đổi cấu trúc não và cải thiện chức năng nhận thức.",
                author: "MICHAEL CHEN",
                date: "28 THÁNG 2, 2024"
            },
            3: {
                title: "Thực phẩm lên men: Xây dựng hệ vi sinh đường ruột khỏe mạnh hơn",
                categories: "Dinh dưỡng, Sức khỏe đường ruột",
                description: "Khám phá thế giới của kim chi, kefir và kombucha và tìm hiểu cách những thực phẩm giàu probiotic này có thể cải thiện hệ tiêu hóa của bạn.",
                author: "NATALIE WONG",
                date: "10 THÁNG 1, 2024"
            },
            4: {
                title: "10 thay thế đơn giản cho gian bếp không nhựa",
                categories: "Nhà ở thân thiện với môi trường, Không rác thải",
                description: "Biến đổi không gian bếp của bạn với những giải pháp thay thế dễ dàng giúp giảm rác thải nhựa mà vẫn giữ được sự tiện lợi.",
                author: "EMMA GREENFIELD",
                date: "5 THÁNG 4, 2024"
            },
            5: {
                title: "Đột phá năng lượng mặt trời: Có gì mới trong năm 2024",
                categories: "Năng lượng tái tạo, Công nghệ",
                description: "Những đổi mới mới nhất trong công nghệ năng lượng mặt trời đang khiến năng lượng tái tạo trở nên hiệu quả và tiết kiệm hơn bao giờ hết.",
                author: "JAMES WILSON",
                date: "22 THÁNG 3, 2024"
            },
            6: {
                title: "Sự trỗi dậy của thời trang tuần hoàn: Những thương hiệu tiên phong",
                categories: "Thời trang bền vững",
                description: "Cách các thương hiệu thời trang tiên phong đang áp dụng mô hình kinh doanh tuần hoàn để giảm thiểu rác thải dệt may.",
                author: "SOFIA MARTINEZ",
                date: "15 THÁNG 2, 2024"
            },
            7: {
                title: "Những vấn đề đạo đức trong trí tuệ nhân tạo sinh",
                categories: "Trí tuệ nhân tạo, Đạo đức",
                description: "Khi AI ngày càng thông minh hơn, chúng ta cần xem xét các vấn đề đạo đức xoay quanh việc phát triển và ứng dụng của nó.",
                author: "DAVID KIM",
                date: "10 THÁNG 4, 2024"
            },
            8: {
                title: "Thuộc địa hóa sao Hỏa: Những thách thức phía trước",
                categories: "Khám phá không gian",
                description: "Các nhà khoa học tiết lộ những trở ngại lớn nhất cần vượt qua trước khi thiết lập sự hiện diện con người lâu dài trên sao Hỏa.",
                author: "BÁC SĨ LISA PARK",
                date: "30 THÁNG 3, 2024"
            },
            9: {
                title: "Bảo vệ danh tính số của bạn trong năm 2024",
                categories: "An ninh mạng",
                description: "Các thực hành bảo mật thiết yếu để bảo vệ danh tính trực tuyến trước các mối đe dọa mạng ngày càng tinh vi.",
                author: "MARK ROBERTS",
                date: "25 THÁNG 1, 2024"
            },
            10: {
                title: "Du lịch có ý thức: Khám phá thế giới một cách có trách nhiệm",
                categories: "Du lịch bền vững",
                description: "Cách giảm thiểu tác động môi trường khi du lịch nhưng vẫn tận hưởng những kỳ quan trên toàn thế giới.",
                author: "ANNABELLE LEE",
                date: "8 THÁNG 4, 2024"
            },
            11: {
                title: "Ngọc thực ẩn giấu: 5 điểm đến ẩm thực ít người biết",
                categories: "Du lịch ẩm thực",
                description: "Khám phá những nền văn hóa ẩm thực ít được biết đến nhưng đầy ấn tượng trên thế giới.",
                author: "CARLOS MENDES",
                date: "18 THÁNG 3, 2024"
            },
            12: {
                title: "Bảo tồn truyền thống cổ xưa trong thế giới hiện đại",
                categories: "Văn hóa bản địa",
                description: "Gặp gỡ các cộng đồng đang nỗ lực duy trì di sản văn hóa của họ trong khi thích nghi với những thách thức hiện đại.",
                author: "MARIA GONZALEZ",
                date: "5 THÁNG 2, 2024"
            }
        },

        categories: {
            healthWellness: "Sức khỏe & Thể chất",
            sustainableLiving: "Cuộc sống bền vững",
            technologyInnovation: "Công nghệ & Đổi mới",
            travelCulture: "Du lịch & Văn hóa"
        }
    },
    product: {
        description: "Mô tả",
        ingredients: "Thành phần",
        recommendedUse: "Khuyến nghị sử dụng",
        howToUse: "Cách sử dụng",
        rating: "Đánh giá",
        sizeTable: "Bảng kích thước",
        sizeGuild: "Hướng dẫn chọn size",
        sizes: {
            small: "S: 30ml - Phù hợp cho du lịch",
            medium: "M: 50ml - Kích thước tiêu chuẩn",
            large: "L: 100ml - Tiết kiệm hơn 20%",
            extraLarge: "Rất lớn"
        },
        productLeft: "Còn lại trong kho",
        outOfOrder: "Hết hàng",
        addCart: "Thêm vào giỏ hàng",
        addToCartSuccess: "Đã thêm vào giỏ hàng thành công",
        freeShipping: "Miễn phí vận chuyển cho đơn hàng từ 1.000.000 VNĐ",
        quality: "Đảm bảo chất lượng",
        refundIn30Days: "Hoàn tiền trong 30 ngày",
        productDetail: "Chi tiết sản phẩm",
        customerReiviews: "Đánh giá từ khách hàng",
        noReview: "Chưa có đánh giá nào",
        writeAReview: "Viết đánh giá",
        seeAllReviews: "Xem tất cả * đánh giá",
        comment: "Bình luận",
        cancel: "Huỷ",
        submit: "Gửi",
        addedToCartSuccess: "Đã thêm vào giỏ hàng thành công",
        addToCartError: "Có lỗi xảy ra khi thêm vào giỏ hàng",
        relatedProducts: "Các sản phẩm liên quan"
    },
    customer: {
        title: "Khách hàng nói gì về chúng tôi",
        description: "Chúng tôi tự hào về dịch vụ mà mình cung cấp và hạnh phúc khi nhận được những phản hồi tích cực từ khách hàng."
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
                    icon: 'Sparkles', // biểu tượng dùng từ lucide-react
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
            teach: "Spagyric medicine teaches us this truth:",
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
    },
    cartSidebar: {
        header: {
            title: "Giỏ hàng của bạn",
            itemCount: (count: number) => `${count}`,
        },
        emptyCart: {
            title: "Giỏ hàng của bạn đang trống",
            description: "Hãy thêm một vài sản phẩm và quay lại đây nhé",
            continueShopping: "Tiếp tục mua sắm",
        },
        cartItem: {
            sizeLabel: "Size:",
            remove: "Xóa",
            decrease: "Giảm",
            increase: "Tăng",
        },
        summary: {
            subtotal: "Tạm tính",
            shippingFee: "Phí vận chuyển",
            freeShipping: "Miễn phí",
            total: "Tổng cộng",
            checkoutButton: "Thanh toán ngay",
            continueShoppingButton: "Tiếp tục mua sắm",
        },
        relatedProducts: {
            title: "Sản phẩm liên quan",
        },
    },
    paymentPage: {
        common: {
            backButton: "Quay lại",
            continueButton: "Tiếp tục",
            completeOrderButton: "Hoàn tất đơn hàng",
            editButton: "Chỉnh sửa",
            changeButton: "Thay đổi",
            securePayment: "Thanh toán an toàn & bảo mật",
            applyButton: "Áp dụng",
            voucherPlaceholder: "Nhập mã voucher...",
        },

        pageTitle: "Thanh toán",

        progressSteps: {
            step1: "Thông tin",
            step2: "Thanh toán",
            step3: "Xác nhận",
        },

        addressStep: {
            title: "Thông tin giao hàng",
            emailLabel: "Email",
            emailPlaceholder: "email@example.com",
            phoneLabel: "Số điện thoại",
            phonePlaceholder: "0901 234 567",
            newsletterCheckbox: "Nhận mail xác nhận",
            addressLabel: "Địa chỉ giao hàng",
            newAddressOption: "Sử dụng địa chỉ mới",
            savedAddressOption: "Sử dụng địa chỉ đã lưu",
            selectAddressPlaceholder: "Chọn địa chỉ",

            countryLabel: "Quốc gia",
            countryPlaceholder: "Chọn quốc gia",
            firstNameLabel: "Họ và Tên",
            firstNamePlaceholder: "Họ và Tên",
            lastNameLabel: "Họ",
            lastNamePlaceholder: "Họ",
            addressPlaceholder: "Nhập địa chỉ",
            apartmentLabel: "Căn hộ, tòa nhà",
            cityLabel: "Thành phố",
            cityPlaceholder: "Nhập thành phố",
            provinceLabel: "Tỉnh/Thành phố",
            provincePlaceholder: "Chọn tỉnh/thành phố",
            zipCodeLabel: "Mã bưu điện",
            zipCodePlaceholder: "Nhập mã bưu điện",
            noteLabel: "Ghi chú",
            notePlaceholder: "Ghi chú cho đơn hàng"
        },

        paymentStep: {
            title: "Phương thức thanh toán",
            creditCard: {
                title: "Thẻ tín dụng",
                cardNumberLabel: "Số thẻ",
                cardNumberPlaceholder: "1234 5678 9012 3456",
                expiryDateLabel: "Ngày hết hạn",
                expiryDatePlaceholder: "MM/YY",
                cvcLabel: "Mã bảo mật",
                cvcPlaceholder: "CVC",
                nameLabel: "Tên trên thẻ",
                namePlaceholder: "NGUYEN VAN A",
            },
            paypal: {
                title: "PayPal",
                noticeTitle: "Bạn sẽ được chuyển đến PayPal",
                noticeDescription: "Sau khi nhấn 'Hoàn tất thanh toán', bạn sẽ được chuyển đến trang PayPal để hoàn tất giao dịch.",
            },
            momo: {
                title: "Ví MoMo",
                noticeTitle: "Bạn sẽ được chuyển đến MoMo",
                noticeDescription: "Sau khi nhấn 'Hoàn tất thanh toán', ứng dụng MoMo sẽ mở để bạn xác nhận thanh toán.",
            },
            cod: {
                title: "Thanh toán khi nhận",
                noticeTitle: "Thanh toán khi nhận hàng",
                noticeDescription: "Tiến hành thanh toán khi đã nhận được hàng.",
            },
            bank: {
                title: "Chuyển khoản ngân hàng",
                noticeTitle: "Pay upon delivery",
                noticeDescription: "Quét QR để thực hiện thanh toán",
            }
        },

        reviewStep: {
            title: "Xác nhận đơn hàng",
            shippingTitle: "Thông tin giao hàng",
            paymentTitle: "Phương thức thanh toán",
            infoLabels: {
                fullName: "Họ tên:",
                phone: "Điện thoại:",
                email: "Email:",
                address: "Địa chỉ:",
                province: "Tỉnh thành:",
                zipCode: "Zip code:",
                country: "Quốc gia:",
                paymentMethod: "Phương thức:",
                creditCard: "Thẻ tín dụng: ",
                bankTransferLabel: "CK",
                bankTransfer: "Chuyển khoản",
            },
            missingInfo: "Chưa có thông tin",
        },

        orderSummary: {
            title: "Đơn hàng của bạn",
            subtotalLabel: "Tạm tính:",
            shippingLabel: "Phí vận chuyển:",
            discountLabel: "Mã giảm giá:",
            discount: "Giảm",
            totalLabel: "Tổng cộng:",
            freeShipping: "Miễn phí",
            orderInfoTitle: "Thông tin đơn hàng",
            infoLabels: {
                email: "Email:",
                phone: "Điện thoại:",
                address: "Địa chỉ:",
                paymentMethod: "Phương thức:",
                size: "Kích thước:",
                amount: "SL:"
            },
            missingInfo: "Chưa nhập",
            notSelected: "Chưa chọn",
        },

        paymentMethods: [
            // {
            //     id: 'credit-card',
            //     name: 'Thẻ tín dụng',
            //     icon: '💳'
            // },
            // {
            //     id: 'paypal',
            //     name: 'PayPal',
            //     icon: '🔵'
            // },
            // {
            //     id: 'momo',
            //     name: 'Ví MoMo',
            //     icon: '💜'
            // },
            {
                id: 'bank',
                name: 'Chuyển khoản ngân hàng',
                icon: ''
            },
            {
                id: 'cod',
                name: 'Thanh toán khi nhận',
                icon: ''
            }
        ],
        provinces: [
            "An Giang",
            "Bà Rịa - Vũng Tàu",
            "Bạc Liêu",
            "Bắc Giang",
            "Bắc Kạn",
            "Bắc Ninh",
            "Bến Tre",
            "Bình Dương",
            "Bình Định",
            "Bình Phước",
            "Bình Thuận",
            "Cà Mau",
            "Cao Bằng",
            "Cần Thơ",
            "Đà Nẵng",
            "Đắk Lắk",
            "Đắk Nông",
            "Điện Biên",
            "Đồng Nai",
            "Đồng Tháp",
            "Gia Lai",
            "Hà Giang",
            "Hà Nam",
            "Hà Nội",
            "Hà Tĩnh",
            "Hải Dương",
            "Hải Phòng",
            "Hậu Giang",
            "Hòa Bình",
            "Hưng Yên",
            "Khánh Hòa",
            "Kiên Giang",
            "Kon Tum",
            "Lai Châu",
            "Lạng Sơn",
            "Lào Cai",
            "Lâm Đồng",
            "Long An",
            "Nam Định",
            "Nghệ An",
            "Ninh Bình",
            "Ninh Thuận",
            "Phú Thọ",
            "Phú Yên",
            "Quảng Bình",
            "Quảng Nam",
            "Quảng Ngãi",
            "Quảng Ninh",
            "Quảng Trị",
            "Sóc Trăng",
            "Sơn La",
            "Tây Ninh",
            "Thái Bình",
            "Thái Nguyên",
            "Thanh Hóa",
            "Thừa Thiên Huế",
            "Tiền Giang",
            "TP. Hồ Chí Minh",
            "Trà Vinh",
            "Tuyên Quang",
            "Vĩnh Long",
            "Vĩnh Phúc",
            "Yên Bái"
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
            processing: "Đơn Hàng Đang Được Tạo",
            complete: "Đơn Hàng Đã Được Tạo!"
        },
        statusMessages: {
            processing: "Chúng tôi đang xử lý đơn hàng của bạn. Quá trình này chỉ mất vài phút để hoàn tất.",
            complete: "Đơn hàng của bạn đã được tạo thành công và sẵn sàng để xử lý tiếp theo."
        },
        errorMessages: {
            title: "Lỗi xử lý đơn hàng",
            createFailed: "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ nếu vấn đề tiếp diễn.",
            timeout: "Không nhận được dữ liệu thanh toán, vui lòng thử lại."
        },
        timeEstimation: {
            processing: "Thời gian xử lý ước tính: ",
            complete: "Đơn hàng đã được xử lý thành công!"
        },
        steps: [
            { label: "Tạo đơn hàng", icon: "📋" },
            { label: "Xác nhận thanh toán", icon: "💳" },
            { label: "Hoàn tất", icon: "✅" }
        ],
        orderInfo: {
            orderNumber: "Mã đơn hàng",
            orderDate: "Ngày đặt hàng",
            paymentMethod: "Phương thức thanh toán"
        },
        buttons: {
            continueShopping: "Tiếp tục mua sắm"
        },
        loadingIndicator: "10 - 15 giây",
        tryAgain: "Thử lại"
    },
    customLoadingTranslations: {
        loadingMessages: {
            initializing: "Đang khởi tạo...",
            loadingData: "Đang tải dữ liệu...",
            almostDone: "Chuẩn bị hoàn tất...",
            redirecting: "Đang chuyển hướng..."
        },
        statusText: {
            loading: "Đang tải",
            ready: "Đã sẵn sàng!"
        },
        animation: {
            typingDots: "..."
        }
    },
    searchPage: {
        result: "Kết quả tìm kiếm cho",
        found1: "Tìm thấy",
        found2: "kết quả phù hợp",
        all: "Tất cả",
        article: "Bài viết",
        product: "Sản phẩm",
        read: "Xem tiếp",
        see: "Xem",
        seeAll: "See all",
        noResult: "No results found",
        retry: "Try searching with a different keyword"
    },
    footer: {
        contact: "LIÊN HỆ",
        legal: "PHÁP LÝ",
        enterEmail: "Nhập địa chỉ email của bạn",
        subscribeSuccess: "Đăng ký thành công. Chúng tôi sẽ gửi thông tin mới nhất đến bạn sớm nhất.",
        join: "Tham gia cộng đồng của chúng tôi",
        stayConnect: "Luôn kết nối với kiến thức thảo dược, thông tin sức khỏe và ưu đãi độc quyền.",
        description: "Các sản phẩm và thông tin được cung cấp qua trang web này chưa được Bộ Y tế Việt Nam (MoH), Cơ quan Quản lý Hàng hóa Trị liệu Úc (TGA), Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ (FDA) hoặc Herbalism Ltd đánh giá, và không nhằm mục đích chẩn đoán, điều trị, chữa khỏi hoặc ngăn ngừa bất kỳ bệnh nào. Mọi thông tin trên trang web này, hoặc trên nhãn hay bao bì sản phẩm của chúng tôi, chỉ nhằm mục đích cung cấp thông tin và không thay thế cho lời khuyên từ chuyên gia chăm sóc sức khỏe chính của bạn. Vui lòng tham khảo ý kiến chuyên gia y tế trước khi sử dụng, cũng như khi cần chẩn đoán hoặc điều trị các vấn đề y tế. Các sản phẩm trên trang web này chứa nhiều chiết xuất thảo dược cô đặc. Hãy đảm bảo rằng bạn không bị dị ứng với bất kỳ thành phần nào trước khi sử dụng.",
        info: {
            shippingPolicy: "Chính sách vận chuyển",
            privacyPolicy: "Chính sách bảo mật",
            termsOfService: "Điều khoản dịch vụ"
        },
        copyright:
            "© 2025 Herbalism đã được đăng kí bản quyền",
    }
};
