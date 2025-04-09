function About() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">About Us</h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                Welcome to our e-commerce platform! We are dedicated to providing you with the best shopping experience, 
                offering a wide range of high-quality products at competitive prices. Our mission is to make online shopping 
                easy, enjoyable, and accessible for everyone.
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="text-center">
                    <img
                        src="/assets/images/avatar.png"
                        alt="Our Mission"
                        className="w-24 h-24 mx-auto mb-4 rounded-full"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                    <p className="text-gray-600 mt-2">
                        To deliver exceptional value and quality to our customers through innovation and dedication.
                    </p>
                </div>
                <div className="text-center">
                    <img
                        src="/assets/images/avatar.png"
                        alt="Our Vision"
                        className="w-24 h-24 mx-auto mb-4 rounded-full"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
                    <p className="text-gray-600 mt-2">
                        To be the leading e-commerce platform, trusted by millions of customers worldwide.
                    </p>
                </div>
                <div className="text-center">
                    <img
                        src="/assets/images/avatar.png"
                        alt="Our Values"
                        className="w-24 h-24 mx-auto mb-4 rounded-full"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">Our Values</h3>
                    <p className="text-gray-600 mt-2">
                        Integrity, customer satisfaction, and continuous improvement are at the heart of everything we do.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;