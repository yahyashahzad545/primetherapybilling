import React from 'react';
import { Hanken_Grotesk } from 'next/font/google';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const hexItems = [
  {
    badge: '5-10% Denial Rate',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDamyjM6UCm8kVBgnLWaJmrxyJTHr8h8ft3LP-BNfZ9_eyehNJHwDGnc6_ORMc4zKTXrPqlcCJ0MVat-di514geNXL0ZvjrMSa0VDPrWvxBIvHUszOcwZM7cpFBF2yGBaNpopWXP7oBQ5HUEk3twFQSSHRGTSvXMVggqV25qoez5Hu4773bqfWCQVbXotzbouhifHQRCMeG-y2bwCMKvDH58hAHmLYFhlbJMwX-kc-biEq8mO-YBXDPYVrmXJcX-fmAXdp-7n05Kx8V',
    alt: 'Bill Icon',
    title: 'Denial Rates Eating Your Revenue',
    desc: "Each reworked claim costs $25-$118. You're paying twice for work that should've been done right.",
  },
  {
    badge: '90+ Days Avg Wait',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADqOwNDNZ4n73IMZz_pDHU7SopXO2ojPqUdvbwnIJzh3dXqJtHETseIQ_0LF3rLaQwuGj0VcoEZgQHqrHSiEJpsyE71oVWZyAVr1nD8-Ek7WHakB5ik0eklHO4fzGjVJFzfK1fYSRlCISIA1cypfwfhQmh1T0Z4qqo6FrlXHz7n6e5ELqmA2h1YCdJ5GZiUr5bU9EwVOhZqn-ULPEjK99cP0l-TjSWmIU0pXD3EP6S5zsjaT2SbQJD6ZHUOuRT8MvX0kyKuuqD1ACK',
    alt: 'Calendar Icon',
    title: 'AR Aging Beyond 90 Days',
    desc: 'Each month of aging drops collection probability by 20-30%. Revenue earned but never collected.',
  },
  {
    badge: '$50-70K Per Biller',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6rQST-JHjDgf_uAnuQ_n_bPU6qPu3WRae3Ygs0YgIuXRpBebLCa1HZA_PQ0KLfMv6SnwpeSxn1Y9psDUqiQs0PECo379DM-ayq5gKGSxY6as_ZT4t_rzvWF-NN5gmWxiygMHJwsLfIjPgzQUPIfhifGMR_zM7-Ilvv4ogh8M_sZ6dE5bsLhgZCF7_eW0Ta5kmzrcqUuME5hYpIbetYEMiSh_SLoors9YKKf6nqs5NqOuO553tVKPKNhrmBT3YGM1a14AF33gAX0D',
    alt: 'Coins Icon',
    title: 'Billing Staff Turnover & Training Costs',
    desc: 'When they leave, knowledge walks out. Hiring restarts, training cycles begin, revenue suffers.',
  },
  {
    badge: '80% Bills Have Errors',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRCtaryd7NJcKU19YvGRVRpyVOmDsgEx6bewEgS57uW0IJqKqO4BnmLWiqQM931ix5c7aXafLmLpKVXqe_CihZge3FA45f-6tVBK0rKJY6x9VFIKWb_7ZwCTQZIabu8a9qctMJom2WBGupMNUbq5Y5C-JcTP9Xf1SfQPnmRjNJ4L55tsFws3_BWj3A0cy5Y0SUBcp_Q-Bw8mmYYPu9cDPg9CfU2dOODzlnJGffzHGSpyseB6rP6a6S3RoU8s41aMYrTFyWTZk5Upu',
    alt: 'Computer Icon',
    title: 'Coding Errors Creating Compliance Risk',
    desc: 'Each mistake is a denied claim, a delayed payment, or an OIG audit flag that costs far more.',
  },
  {
    badge: 'Flying Blind',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCahL2Dxl6m5uomz3Y6Gb-KDp_-wkzvJnsO0daMRf8kt7jh_Y1fCgd6JpKYjP0zE9iKfP3ygmOEfDRdJZvO90Ld7ygN-KbXqs07HtIbwRrwXK2_Krn0IBnLAkSJlJ-syeHN5U3dEIfbTeYsVcB8uSfxImK012gMlH2rlmvWFaUgqIGpl-xBga5prZm9WZc4M5ycISrItNjP51A1zvtfXbC2vnX5vvEhQgUZaegiEUdu_u7-vcYFs_ZeILciyFeu3sBe4o8-E5HjlqV',
    alt: 'Eye Icon',
    title: 'No Visibility Into Financial Performance',
    desc: "Can you pull clean claim rate or denial rate by category right now? If not, you're deciding blind.",
  },
];

export default function PainPointsHexagon() {
  return (
    <>
      <div
        className={`bg-gray-50 font-sans text-[#1D3557] antialiased min-h-screen flex items-center ${hankenGrotesk.className}`}
      >
        {/* BEGIN: Main Diagram Section */}
        <main className="w-full relative">
          <div className="hex-container">
            {/* Background Card */}
            <div className="hex-bg-card"></div>

            {/* Hexagon Grid */}
            <div className="hex-grid">
              {/* Top Row */}
              <div className="hex-row-top">
                {hexItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="hex-item-wrapper">
                    <div className="hex-item">
                      <span className="badge">{item.badge}</span>
                      <img
                        alt={item.alt}
                        className="w-12 h-12 mb-3"
                        src={item.img}
                        loading="lazy"
                      />
                      <h3 className="font-bold text-[15px] leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#457B9D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="hex-row-bottom">
                {hexItems.slice(2, 5).map((item, index) => (
                  <div key={index} className="hex-item-wrapper">
                    <div className="hex-item">
                      <span className="badge">{item.badge}</span>
                      <img
                        alt={item.alt}
                        className="w-12 h-12 mb-3"
                        src={item.img}
                        loading="lazy"
                      />
                      <h3 className="font-bold text-[15px] leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#457B9D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Contact Bar */}
          <aside className="floating-nav">
            <svg
              className="floating-nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <svg
              className="floating-nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <svg
              className="floating-nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </aside>
        </main>
        {/* END: Main Diagram Section */}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hex-container {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .hex-bg-card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          height: 60%;
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          z-index: 0;
        }

        .hex-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          position: relative;
          z-index: 10;
        }

        .hex-row-top {
          display: flex;
          justify-content: center;
          gap: 2rem;
          width: 100%;
          margin-bottom: -4rem; /* Overlap rows */
        }

        .hex-row-bottom {
          display: flex;
          justify-content: center;
          gap: 2rem;
          width: 100%;
        }

        .hex-item {
          position: relative;
          width: 280px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          background: white;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .hex-item-wrapper {
          position: relative;
          width: 284px;
          height: 324px;
          background: #2A9D8F;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .badge {
          background-color: #FFECEE;
          color: #FF5E7E;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .floating-nav {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          background-color: #2A9D8F;
          border-radius: 9999px;
          padding: 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 50;
        }

        .floating-nav-icon {
          color: white;
          width: 24px;
          height: 24px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        
        .floating-nav-icon:hover {
          opacity: 0.8;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .hex-row-top {
            margin-bottom: 0;
            flex-wrap: wrap;
          }
          .hex-row-bottom {
            flex-wrap: wrap;
          }
          .hex-bg-card {
            display: none;
          }
          .floating-nav {
            right: 1rem;
            padding: 0.75rem 0.35rem;
            gap: 0.75rem;
          }
          .floating-nav-icon {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 400px) {
          .hex-container {
            padding: 2rem 1rem;
          }
          .hex-item-wrapper {
            width: 244px;
            height: 278px;
          }
          .hex-item {
            width: 240px;
            height: 274px;
            padding: 1.5rem;
          }
        }
      `}} />
    </>
  );
}