function Contact() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                Have questions or need help? Feel free to reach out to us using the form below or through our contact details.
            </p>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="Write your message here"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Details */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                            <span className="text-primary text-xl">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                            <span className="text-gray-600">+1 (123) 456-7890</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="text-primary text-xl">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <span className="text-gray-600">support@example.com</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="text-primary text-xl">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                            <span className="text-gray-600">123 E-commerce St, Online City, Web</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;