# Artify: Transform Photos Into Art with AI 🎨

![Artify Logo](/public/logo.svg)

Artify is an AI-powered web application that transforms ordinary photos into stunning artworks in various artistic styles. Simply upload a photo, choose a style, and watch as artificial intelligence reimagines your image into a beautiful work of art.

## ✨ Features

- **Multiple Artistic Styles**: Transform photos into different styles including Studio Ghibli, Cartoon, Outline Sketch, and more
- **Fast Transformation**: AI-powered transformations that take just seconds to complete
- **User-Friendly Interface**: Clean, intuitive design that makes the process simple and enjoyable
- **Responsive Design**: Works beautifully on both desktop and mobile devices
- **High-Quality Output**: Download your transformed images in high resolution
- **Image Preview**: Click on images to view them in full-screen mode
- **Secure Processing**: All image processing happens on secure servers

## 🖼️ Demo

![original](/public/orginal.jpg)
![Artified Demo](/public/artified-cartoon (1).png)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/artify.git
   cd artify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💻 Usage

1. **Upload an Image**: Click on the upload area or drag and drop an image
2. **Select a Style**: Choose from various artistic styles in the dropdown menu
3. **Transform**: Click the "Artify Image" button to start the transformation
4. **View & Download**: Once processing is complete, view your transformed image and download it

## 🛠️ Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **AI Integration**: Google Gemini 2.0 Flash AI via GenKit
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Image Processing**: Canvas API, client-side resizing
- **Performance Optimization**: Next.js Image optimization, lazy loading
- **Analytics**: Custom event tracking

## 📱 Mobile Support

Artify is fully responsive and works great on mobile devices. The interface automatically adjusts to provide the best experience regardless of screen size.

## 🔒 Privacy & Security

- No images are stored permanently on our servers
- All processing happens in secure environments
- We don't collect or share personal information

## 🔄 How It Works

1. User uploads an image which is securely sent to our server
2. The image is processed using Google's Gemini 2.0 Flash model with specialized prompts for each style
3. The AI generates a transformed version based on the selected style
4. The transformed image is sent back to the user's browser
5. Users can download the final artwork in high resolution

## ✏️ Planned Features

- Additional artistic styles (Van Gogh, Cyberpunk, Watercolor, etc.)
- Batch processing of multiple images
- Adjustable transformation parameters
- User accounts to save transformation history
- Social sharing capabilities

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) for providing the AI capabilities
- [Next.js](https://nextjs.org/) for the React framework
- [Shadcn UI](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for the icons used throughout the app
- [Vercel](https://vercel.com/) for hosting

## 📧 Contact

Have questions or feedback? Reach out to us at [amazingjimmy44@gmail.com](mailto:amazingjimmy44@gmail.com).

---

Created by [James Karanja](https://jameskaranja.netlify.app/) with ❤️
