import React from 'react';
import Image from 'next/image';

interface BlogPost {
    title: string;
    titleImg: string;
    author: string;
    date: string;
    content:(string | JSX.Element)[];
  }
  

export const blogPosts: Record<string, BlogPost> = {
    "1": {
        title: "Hướng dẫn Next.js cho người mới",
        titleImg: "/images/nextjs-header.jpg",
        author: "Nguyễn Văn A",
        date: "29/03/2025",
        content: [
            "Next.js là một framework React phổ biến giúp xây dựng các ứng dụng web hiệu quả.",
            <img key="nextjs-img" src = "/images/nextjs.png" alt = "Next.js" width = { 500} height = { 300} className = "rounded-md my-6 mx-auto shadow-md" />,
            "Trong bài viết này, chúng ta sẽ tìm hiểu về cách sử dụng Next.js để phát triển website.",
            <img key="react-img" src = "/images/react.png" alt = "React" width = { 500} height = { 300} className = "rounded-md my-6 mx-auto shadow-md" />,
            "Một trong những tính năng mạnh mẽ của Next.js là hỗ trợ Server-side Rendering (SSR).",
        ],
    },
    "2": {
        title: "Harmonic Arts Products are Made in Canada",
        titleImg: "/img/blog_id_2.png",
        author: "Elizabeth Ferns",
        date: "March 20, 2025",
        content: [
            "At Harmonic Arts, we’re deeply committed to providing high-quality, ethically sourced, and eco-conscious products. As a values-driven, Canadian company, we continuously strive to balance quality and sustainability with accessibility. Our mission drives us first and foremost, but financial sustainability is essential to achieving our goals. You may notice price adjustments from time to time, and they reflect rising costs of sourcing, packaging, regulatory fees, continuously improving our sustainable practices, and investing in both our team members and our retail partners across Canada. Read on to dive deeper into the many facets of running a values-driven business.",
            <h1>Our Company Values </h1>,
            "Harmonic Arts is committed to crafting plant medicine with purpose and using our business as a force for good. Our mission is to cultivate healthier communities and deepen the connection between people and the planet by providing effective and easy-to-use herbal products that empower everyone on their path to wellness.",
            "To us, this is multi-faceted, with each part coming together in a way that ensures an abundant future for all. This means prioritizing quality with ethically sourced ingredients while continually seeking out sustainable practices throughout our supply chain. It means using eco-conscious packaging and taking action to lower our carbon footprint. It means giving back to our community and supporting organizations that care as much as we do about the health of our planet. It means recruiting Canadians for our plant-powered team, continuing to improve compensation and benefits programs, and providing support for their career development.",
            "Every choice we make is an investment—in quality, sustainability, our people, and the communities we support. By choosing our herbal products, you’re not just purchasing wellness solutions; you’re supporting ethical sourcing, local and national economies, and a business that aligns with your values. We remain committed to keeping our products as accessible as possible while upholding these principles.",
            <h1>Investing in Your Health & The Health of the Planet </h1>,
            < h2 > Ethical & Organic Sourcing </h2>,
            "Harmonic Arts began as a way to fill a gap in the market for high-quality herbs in our local community on Vancouver Island. Fifteen years later, this is still our number one priority when it comes to our formulations. While we now sell our products across the nation, we still ensure they are pure, potent, effective, and easy to use. As a guiding principle, we choose certified organic herbs whenever possible.",
            "When asked about our sourcing, we are transparent about our priorities: top quality and potency that is produced through ethical and sustainable cultivation. We work with various vendors from herb brokerages to small farmers worldwide and we’re committed to sourcing Canadian ingredients when we can. For example:",
            <ul className="list-disc list-inside space-y-2" >
            <li>Our Chaga Tea is wild harvested from Canadian boreal forests.</li>
            < li > Our Functional Mushrooms are sourced from organic, generational farms in the pristine mountainous regions of China – the world’s leading mushroom supplier with rigorous standards that guide the cultivation of medicinal mushrooms.</li>
                < li > Our Shilajit is wild harvested from the Himalayas in India and is purified using a traditional Ayurvedic method.</li>
                    </ul>,
            "Our commitment to quality sourcing means carefully selecting the best herbs from around the world and bringing them to our facility on Vancouver Island, BC. We prioritize potency, purity, and ethical sourcing, ensuring that every ingredient meets our high standards. Despite the premium nature of these ingredients, we remain dedicated to offering exceptional value, making high-quality herbal products accessible without compromise.",
            < h2 > Putting Quality First</ h2 >,
"Sourcing lower-cost, lower-quality herbs would compromise our values and the very foundation of Harmonic Arts. Once our herbs, mushrooms, superfoods, and other ingredients arrive at our facility, we ensure their purity and potency through third-party testing, which also verifies the accuracy of our vendors' certificates of analysis.",
    "These certificates show the results of testing for physical, chemical, and microbiological characteristics. This can include taste, smell, polyphenol content, polysaccharide content, and whether the herbs are free from harmful toxins, heavy metals, and bacteria. We are not required to do this additional testing, but we feel strongly about providing top quality and transparency to our customers.",
    <h2>Eco - Friendly Packaging </h2>,
"With our core values in mind, we’ve prioritized packaging that is easily recycled, composted, or upcycled. We're always on the lookout for new, innovative packaging that puts the health of the earth first. Here are some highlights:",
    <ul className="list-disc list-inside space-y-2" >
        <li>In 2024, our packaging choices diverted over 72, 238 lbs.of waste from entering landfills.</li>
            < li > Our Operations team replaced single - use pallet wrap in our manufacturing facility with a reusable alternative for 99 % of our operations.</li>
                < li > Our Artisan Teas feature compostable bags, which kept the equivalent of over 17,000 plastic bottles from entering the ocean last year.Once the label stickers are removed, these bags will break down efficiently within any home or municipal compost.</li>
                    < li > Our Herbal Lattes feature 100 % compostable bags, made from post - consumer recycled kraft paper, a plant - based zipper, and soy - based ink.These bags will break down efficiently within any home or municipal compost.</li>
                        </ul>,
"Learn more about our packaging here.",
    <h2>Certifications & Operations </h2>,
"We’re proud to operate, formulate, and package our products in Cumberland, BC, in a facility that is certified organic. We’re B Corp Certified, Climate Smart Certified, and we’ve earned Green Badges from BC Green Business every year since 2021. These certifications—and the ongoing dedication required to uphold them—reflect our deep commitment to sustainability, quality, and ethical business practices. Learn more about this here. We are committed to continuous improvement, and we consistently prioritize upgrades to our facility that improve the health and safety of our team members.",
    "Unfortunately, regulatory costs are increasing substantially with the new cost recovery program and plain language labelling (PLL) requirements from Health Canada. Fees to register our Natural Health Products are rising and having to upgrade our packaging to comply with PLL requirements are a hefty investment. If you want to learn more, we recommend visiting the Canadian Health Food Association (of which we are members) to see how you can support small Canadian business like us with advocacy.",
    <h2>Supporting Retailers </h2>,
"We are committed to supporting the success of our retailer partners. When you find your favourite Harmonic Arts products at your local health food store, we’ve gone beyond simply providing the products for their shelves.",
    "We provide product training through webinars and in-person demonstrations to ensure the store employees are able to answer any customer questions about our products. We provide posters and other resources that contain beneficial details at a glance. We do our best to align with store promotions, and we also provide custom retail displays that showcase our products.",
    "You may notice that our products are priced differently across various retail locations. While we provide manufacturer suggested retail pricing (MSRP) for our products, it is up to the retailer to make pricing adjustments that align with their own financial needs.",
    <h2>We Wouldn’t Be Here Without You </h2>,
"In a time where consumers are more conscious than ever, we appreciate you investing in Harmonic Arts and incorporating our products into your wellness routines. Thank you for your understanding, and for supporting us as we continue to craft plant medicine with purpose.",
        ],
    },
};