'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  topic?: string; // Different topics for different sections
}

export default function PageHero({ title, description, badge, topic }: PageHeroProps) {
  // Topic-based language selection
  const getLanguagesByTopic = (topicName?: string) => {
    const allLanguages = [
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', emoji: '⚡', gradient: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', emoji: '🔷', gradient: 'from-blue-500 to-blue-700' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', emoji: '⚛️', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000', emoji: '▲', gradient: 'from-gray-700 to-gray-900' },
    { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', emoji: '💚', gradient: 'from-green-400 to-green-600' },
    { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031', emoji: '🔄', gradient: 'from-red-500 to-red-700' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', emoji: '🟢', gradient: 'from-green-500 to-green-700' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', emoji: '🐍', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Java', icon: 'https://cdn.simpleicons.org/java/ED8B00', emoji: '☕', gradient: 'from-orange-500 to-orange-700' },
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C', emoji: '⚙️', gradient: 'from-blue-600 to-blue-800' },
    { name: 'C#', icon: 'https://cdn.simpleicons.org/csharp/239120', emoji: '🔵', gradient: 'from-blue-600 to-purple-700' },
    { name: 'PHP', icon: 'https://cdn.simpleicons.org/php/777BB4', emoji: '🐘', gradient: 'from-indigo-500 to-indigo-700' },
    { name: 'Ruby', icon: 'https://cdn.simpleicons.org/ruby/CC342D', emoji: '💎', gradient: 'from-red-600 to-red-800' },
    { name: 'Go', icon: 'https://cdn.simpleicons.org/go/00ADD8', emoji: '🚀', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Rust', icon: 'https://cdn.simpleicons.org/rust/000000', emoji: '🦀', gradient: 'from-orange-600 to-orange-800' },
    { name: 'Swift', icon: 'https://cdn.simpleicons.org/swift/FA7343', emoji: '🍎', gradient: 'from-orange-500 to-orange-700' },
    { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF', emoji: '📱', gradient: 'from-purple-500 to-purple-700' },
    { name: 'Dart', icon: 'https://cdn.simpleicons.org/dart/0175C2', emoji: '🎯', gradient: 'from-blue-400 to-blue-600' },
    { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26', emoji: '🌐', gradient: 'from-orange-500 to-red-600' },
    { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3/1572B6', emoji: '🎨', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/38B2AC', emoji: '💨', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Bootstrap', icon: 'https://cdn.simpleicons.org/bootstrap/7952B3', emoji: '📦', gradient: 'from-purple-500 to-purple-700' },
    { name: 'SASS', icon: 'https://cdn.simpleicons.org/sass/CC6699', emoji: '💅', gradient: 'from-pink-500 to-pink-700' },
    { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', emoji: '🍃', gradient: 'from-green-500 to-green-700' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', emoji: '🐘', gradient: 'from-blue-600 to-blue-800' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', emoji: '🗄️', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', emoji: '🔴', gradient: 'from-red-600 to-red-800' },
    { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28', emoji: '🔥', gradient: 'from-yellow-400 to-orange-500' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', emoji: '🐳', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5', emoji: '⚓', gradient: 'from-blue-500 to-blue-700' },
    { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/232F3E', emoji: '☁️', gradient: 'from-orange-500 to-orange-700' },
    { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure/0078D4', emoji: '🔵', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4', emoji: '☁️', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', emoji: '📦', gradient: 'from-red-500 to-red-700' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717', emoji: '🐙', gradient: 'from-gray-700 to-gray-900' },
    { name: 'GitLab', icon: 'https://cdn.simpleicons.org/gitlab/FC6D26', emoji: '🦊', gradient: 'from-orange-500 to-orange-700' },
    { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098', emoji: '📊', gradient: 'from-pink-500 to-pink-700' },
    { name: 'REST API', icon: 'https://cdn.simpleicons.org/json/000000', emoji: '🔌', gradient: 'from-gray-600 to-gray-800' },
    { name: 'Webpack', icon: 'https://cdn.simpleicons.org/webpack/8DD6F9', emoji: '📦', gradient: 'from-cyan-400 to-blue-600' },
    { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF', emoji: '⚡', gradient: 'from-purple-500 to-purple-700' },
    { name: 'NPM', icon: 'https://cdn.simpleicons.org/npm/CB3837', emoji: '📦', gradient: 'from-red-600 to-red-800' },
    { name: 'Yarn', icon: 'https://cdn.simpleicons.org/yarn/2C8EBB', emoji: '🧶', gradient: 'from-blue-400 to-blue-600' },
    ];

    // Topic-based filtering
    switch(topic) {
      case 'frontend':
        return allLanguages.filter(lang => 
          ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'SASS', 'Webpack', 'Vite', 'NPM', 'Yarn'].includes(lang.name)
        );
      case 'backend':
        return allLanguages.filter(lang => 
          ['Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'GraphQL', 'REST API', 'Git', 'GitHub', 'GitLab'].includes(lang.name)
        );
      case 'database':
        return allLanguages.filter(lang => 
          ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'].includes(lang.name)
        );
      case 'cloud':
        return allLanguages.filter(lang => 
          ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase'].includes(lang.name)
        );
      case 'mobile':
        return allLanguages.filter(lang => 
          ['React', 'JavaScript', 'TypeScript', 'Swift', 'Kotlin', 'Dart', 'Node.js'].includes(lang.name)
        );
      default:
        return allLanguages; // All languages for default
    }
  };

  const languages = getLanguagesByTopic(topic);

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden min-h-[70vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        {/* DSA Ball Logic - Tree Structure Layout */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ background: 'transparent' }}>
          {languages.map((lang, index) => {
            const delay = index * 0.05;
            const bounceDuration = 2 + (index % 5) * 0.2;
            const bounceHeight = 4 + (index % 3) * 1; // Reduced bounce height (max 6px) to prevent overflow
            
            // DSA Binary Tree Structure Logic (Proper Tree Visualization)
            const treeDepth = Math.ceil(Math.log2(languages.length + 1)); // Dynamic depth based on nodes
            const maxNodesAtDepth = (depth: number) => Math.pow(2, depth);
            
            // Calculate which level (depth) this node belongs to in binary tree
            let cumulative = 0;
            let level = 0;
            let positionInLevel = 0;
            
            for (let i = 0; i < treeDepth; i++) {
              const nodesAtThisLevel = Math.min(maxNodesAtDepth(i), languages.length - cumulative);
              if (index < cumulative + nodesAtThisLevel) {
                level = i;
                positionInLevel = index - cumulative;
                break;
              }
              cumulative += nodesAtThisLevel;
            }
            
            // If index exceeds tree structure, use last level
            if (level >= treeDepth) {
              level = treeDepth - 1;
              const nodesAtLastLevel = languages.length - cumulative;
              positionInLevel = (index - cumulative) % nodesAtLastLevel;
            }
            
            // Calculate position based on binary tree structure
            const totalNodesInLevel = Math.min(maxNodesAtDepth(level), languages.length - (level > 0 ? cumulative - maxNodesAtDepth(level - 1) : 0));
            const levelWidth = 70; // Use 70% of width to prevent overflow
            const spacingBetweenNodes = totalNodesInLevel > 1 ? levelWidth / (totalNodesInLevel - 1) : 0;
            const startX = 50 - (levelWidth / 2);
            const xPosition = startX + (positionInLevel * spacingBetweenNodes);
            const yPosition = 22 + level * 11; // Vertical spacing - top padding to prevent overflow on Y-axis
            
            // Parent-child relationship for binary tree
            const hasParent = level > 0;
            const parentLevel = level - 1;
            const parentPositionInLevel = Math.floor(positionInLevel / 2);
            const parentCumulative = parentLevel > 0 ? maxNodesAtDepth(parentLevel - 1) - 1 : 0;
            const parentTotalNodes = Math.min(maxNodesAtDepth(parentLevel), languages.length - (parentLevel > 0 ? parentCumulative : 0));
            const parentStartX = 50 - (levelWidth / 2);
            const parentSpacing = parentTotalNodes > 1 ? levelWidth / (parentTotalNodes - 1) : 0;
            const parentX = hasParent ? (parentStartX + (parentPositionInLevel * parentSpacing)) : null;
            const parentY = hasParent ? (20 + parentLevel * 12) : null;
            
            return (
              <motion.div
                key={lang.name}
                className="absolute"
                initial={{ 
                  opacity: 0, 
                  scale: 0, 
                  y: -50, 
                  rotate: -90 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotate: 0,
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: delay,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                }}
                style={{
                  left: `${xPosition}%`,
                  top: `${yPosition}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -4,
                  rotate: 360,
                  zIndex: 30,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Connection Line to Parent (DSA Tree Structure) */}
                {hasParent && parentX !== null && parentY !== null && (
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: '0',
                      top: '0',
                      width: '100%',
                      height: '100%',
                      zIndex: -1,
                      overflow: 'visible',
                    }}
                  >
                    <motion.line
                      x1={`${parentX}%`}
                      y1={`${parentY}%`}
                      x2={`${xPosition}%`}
                      y2={`${yPosition}%`}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: delay + 0.3 }}
                    />
                  </svg>
                )}
                {/* DSA-Style Ball - Limited Bounce (No Overflow) */}
                <motion.div 
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${lang.gradient} rounded-full p-2 sm:p-2.5 shadow-2xl border-3 border-white/50 flex items-center justify-center backdrop-blur-md overflow-hidden`}
                  animate={{
                    y: [0, -Math.min(bounceHeight, 6), 0], // Limited to max 6px bounce
                  }}
                  transition={{
                    duration: bounceDuration,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94], // Smooth bounce
                    delay: delay,
                  }}
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                  }}
                >
                  {/* Solid Outer Ring - DSA Style */}
                  <motion.div
                    className={`absolute inset-0 border-3 bg-gradient-to-br ${lang.gradient} rounded-full opacity-30`}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: bounceDuration * 1.5,
                      repeat: Infinity,
                      delay: delay,
                    }}
                  />

                  {/* Inner Glow - Subtle */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full blur-sm"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: delay,
                    }}
                  />

                  {/* Logo Image - Stable */}
                  <div className="relative w-full h-full flex items-center justify-center z-10">
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      width={36}
                      height={36}
                      className="object-contain p-1.5 filter drop-shadow-lg"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          target.style.display = 'none';
                          parent.innerHTML = `<span class="text-xl sm:text-2xl drop-shadow-lg">${lang.emoji}</span>`;
                        }
                      }}
                    />
                  </div>

                  {/* Top Shine - DSA Style */}
                  <motion.div
                    className="absolute top-1 left-1/4 w-1/2 h-1/3 bg-white/50 rounded-full blur-md"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: bounceDuration * 1.3,
                      repeat: Infinity,
                      delay: delay,
                    }}
                  />

                  {/* Connecting Line Indicator (DSA Style) */}
                  {index % 7 === 0 && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-white/40 to-transparent rounded-full"
                      animate={{
                        height: [4, 8, 4],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: delay,
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Title Section - Modern Pyara Design with Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-50 flex flex-col items-center justify-center"
          style={{ minHeight: '50vh' }}
        >
          {/* Modern Badge with Box Design */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mb-8"
            >
              {/* Animated Box Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(147, 51, 234, 0.4)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                  backdropFilter: 'blur(10px)',
                }}
              />
              
              {/* Badge Content */}
              <div className="relative px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                  />
                  <span className="text-sm font-bold text-blue-200">{badge}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Title - Modern Gradient Box Style */}
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative mb-8"
            >
              {/* Animated Box Background */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15))',
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                  ],
                  boxShadow: [
                    '0 20px 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.1)',
                    '0 20px 60px rgba(147, 51, 234, 0.3), inset 0 0 30px rgba(147, 51, 234, 0.15)',
                    '0 20px 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.1)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              
              {/* Title Text with Gradient */}
              <div className="relative px-8 py-6 rounded-3xl">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-0 leading-tight relative z-10"
                  style={{ 
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {title}
                  </motion.span>
                </motion.h1>
              </div>
            </motion.div>
          )}

          {/* Description - Modern Box Style */}
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative max-w-3xl mx-auto"
            >
              {/* Description Box */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
                  ],
                  borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                }}
              />
              
              <motion.p
                className="relative text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed px-6 py-4 rounded-2xl font-light z-10"
                style={{ 
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 5px rgba(0, 0, 0, 0.3)',
                }}
              >
                {description}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
