'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-black to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div 
        className="relative min-h-screen flex flex-col items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block">
              <span className="text-6xl mb-4 block">🧩</span>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Riddle Quest
              </h1>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
              Welcome Back
            </h2>
            
            <LoginForm onSuccess={() => router.push('/dashboard')} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-4 text-center"
          >
            <Link 
              href="/"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
