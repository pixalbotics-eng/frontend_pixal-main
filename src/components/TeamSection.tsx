'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from './ui/Icons';
import { teamApi, type TeamMember } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import EmptyState from './ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-pink-500 to-rose-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-amber-500'] as const;

function getMemberImage(member: TeamMember) {
  const url = getDisplayImageUrl(member);
  return url || null;
}

/** Role display order: CEO → Co-founder/Founder → CTO → Team Lead → others */
function getRoleSortOrder(member: TeamMember): number {
  const r = (member.role || member.position || '').toLowerCase().trim();
  if (r.includes('ceo')) return 0;
  if (r.includes('co-founder') || r.includes('cofounder') || r.includes('founder')) return 1;
  if (r.includes('cto')) return 2;
  if (r.includes('team lead') || r.includes('teamlead')) return 3;
  return 4;
}

function sortTeamByRole(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => getRoleSortOrder(a) - getRoleSortOrder(b));
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchTeam = useCallback(() => {
    setLoading(true);
    teamApi.getAll()
      .then((res) => setTeamMembers(res.data?.team ?? []))
      .catch(() => setTeamMembers([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  useRefetchOnWindowFocus(fetchTeam);

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            Our Team
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Meet Our Amazing Team
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate experts dedicated to delivering exceptional AI and technology solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
              <p>Loading team...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="col-span-full">
              <EmptyState message="No team members yet." />
            </div>
          ) : (
            sortTeamByRole(teamMembers).map((member, index) => {
              const gradient = GRADIENTS[index % GRADIENTS.length];
              const imgUrl = getMemberImage(member);
              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  <motion.div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                  <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 transition-all shadow-md hover:shadow-xl h-full flex flex-col overflow-hidden">
                    <div className="relative mb-6">
                      <div className={`relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br ${gradient} p-0.5 shadow-lg`}>
                        <motion.div className="relative w-full h-full rounded-full bg-white overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              <span className="text-3xl sm:text-4xl font-bold text-gray-600">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </motion.div>
                        <motion.div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md" animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
                      </div>
                    </div>
                    <div className="text-center mb-6 flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{member.name}</h3>
                      {(member.role || member.position) && (
                        <div className={`inline-block px-4 py-1.5 rounded-lg bg-gradient-to-r ${gradient} text-white text-xs sm:text-sm font-semibold mb-4 shadow-sm`}>
                          {member.role || member.position}
                        </div>
                      )}
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{member.bio || '—'}</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-5 border-t border-gray-100">
                      <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors shadow-sm" aria-label="LinkedIn">
                        <LinkedinIcon size={18} />
                      </motion.a>
                      <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors shadow-sm" aria-label="GitHub">
                        <GithubIcon size={18} />
                      </motion.a>
                      <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 hover:bg-cyan-100 transition-colors shadow-sm" aria-label="Twitter">
                        <TwitterIcon size={18} />
                      </motion.a>
                      <motion.a href="/contact" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors shadow-sm" aria-label="Email">
                        <MailIcon size={18} />
                      </motion.a>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br ${gradient} opacity-3 rounded-tl-2xl`}></div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-200 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              We&apos;re always looking for talented individuals to join our growing team. If you&apos;re passionate about AI, technology, and innovation, we&apos;d love to hear from you.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
            >
              View Open Positions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

