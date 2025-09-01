'use client'

export default function Footer() {
  return (
    <footer>
      {/* Bookstore Footer Section */}
      <div className="bg-[#FB635D] text-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-12 gap-6">

          {/* Quick Links */}
          <div className="col-span-4 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#shop" className="hover:underline">Shop Books</a></li>
                <li><a href="#bestsellers" className="hover:underline">Best Sellers</a></li>
                <li><a href="#categories" className="hover:underline">Categories</a></li>
                <li><a href="#authors" className="hover:underline">Authors</a></li>
                <li><a href="#careers" className="hover:underline">Careers</a></li>
                <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* About + Mission + Follow + Disclaimers */}
          <div className="col-span-8 space-y-6">
            {/* About */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Về công ty BookStore</h3>
              <p className="text-sm leading-relaxed">
                BookStore là nền tảng bán sách trực tuyến hàng đầu, mang đến hàng ngàn đầu sách từ văn học, kinh tế, kỹ năng sống đến sách chuyên ngành.
                Với sứ mệnh lan toả tri thức, chúng tôi kết nối độc giả với thế giới sách rộng lớn.
              </p>
            </div>

          
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Introduce</h3>
              <p className="text-sm leading-relaxed">
                Chúng tôi tin rằng sách là chìa khóa mở ra tri thức và cơ hội.
                BookStore Company cam kết mang đến trải nghiệm mua sắm tiện lợi, dịch vụ giao hàng nhanh chóng,
                cùng với các chương trình ưu đãi hấp dẫn để mỗi người đều có thể sở hữu những cuốn sách mình yêu thích.
              </p>
            </div>

           
            <div>
              <h3 className="text-lg font-bold mb-2">Contact</h3>
              <div className="flex space-x-4">
                
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="hover:opacity-80"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.525 0H1.477A1.476 1.476 0 000 1.476v21.049A1.476 1.476 0 001.476 24h11.349v-9.293H9.845v-3.62h2.98V8.41c0-2.952 1.803-4.562 4.435-4.562 1.26 0 2.342.094 2.658.136v3.08l-1.824.001c-1.432 0-1.71.681-1.71 1.679v2.201h3.418l-.446 3.62h-2.972V24h5.829A1.476 1.476 0 0024 22.524V1.476A1.476 1.476 0 0022.525 0z" />
                  </svg>
                </a>
                
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-sm leading-relaxed space-y-4 pt-4">
              <p>© 2025 <span className="font-bold">BookStore</span>. All rights reserved.</p>
              <p>
                Tất cả tiêu đề sách, bìa sách và nội dung liên quan là tài sản của các nhà xuất bản và tác giả tương ứng.
                BookStore là nhà bán lẻ độc lập và không liên kết với bất kỳ tổ chức xuất bản chính thức nào.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
