import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  --opacity-50: 0.5;
  --font-sm: 1.2rem;
  --font-md: 1.6rem;
  --font-xmd: 1.8rem;
  --font-lg: 2rem;
  --font-xl: 3rem;
  --font-2xl:4rem;
  --font-3xl:5rem;
  /* Indigo */
  --color-brand-highTransparency:rgba(55,65,81,0.1);
  --color-brand-midTransparency:rgba(55,65,81,0.3);
  --color-brand-smallTransparency:rgba(55,65,81,0.5);
  --color-brand-xsmallTransparency:rgba(55,65,81,0.8);
  --color-brand-50: #9de8f5;
  --color-brand-100: #85d4e2;
  --color-brand-200: #71c2d0;
  --color-brand-300: #5fb1c0;
  --color-brand-400: #4c9ead;
  --color-brand-500: #3c8b9a;
  --color-brand-600: #33808f;
  --color-brand-700: #257180;
  --color-brand-800: #165864;
  --color-brand-900: #165864;
  /* --color-brand-50: #E0FFFF;
  --color-brand-100: #7CB9E8;
  --color-brand-200: #6CB4EE;
  --color-brand-300: #00BFFF;
  --color-brand-400: #0CAFFF;
  --color-brand-500: #0071c5;
  --color-brand-600: #1560bd;
  --color-brand-700: #034694;
  --color-brand-800: #012169;
  --color-brand-900: #002D62; */
  --color-beige-100:#FFFDFA;
  --color-beige-300:#FAF7F0;
  --color-beige-400:#f2ebda;
  --color-beige-500:#D8D2C2;
  --color-beige-700:#B17457;
  --color-beige-900:#be6c45;
  --color-brown-0:#f6e7e7;
 
   --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  /* Grey */
   &,&.light-mode {
    --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #2C1989;
  --color-green-100: #dcfce7;
  --color-green-700: #19892C;
  --color-green-900: #0e5a1b;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;



  --backdrop-color: rgba(255, 255, 255, 0.1);}
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  /* --shadow-sm: 0 1px 2px rgba(37,113,128, 0.08); */
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  /* --shadow-md: 0px 0.6rem 2.4rem rgba(177,116,87, 0.1); */
  --shadow-bottom-sm:0 2px 0px -2px rgba(0, 0, 0, 0.15);
  --shadow-bottom-md:0 4px 2px -4px rgba(0, 0, 0, 0.15);
  --shadow-bottom-lg:0 6px 4px -6px rgba(0, 0, 0, 0.15);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 2.4rem 3.2rem rgba(177,116,87, 0.15);
  --shadow-pic: 0px 2px 8px 0px  rgba(177,116,87, 0.15);
  --line-sm: 1.2;
  --line-md: 1.5;
  --line-lg: 2;
  --letter-space-sm: 1.3px;
  --letter-space-md: 1.5px;
  --letter-space-lg: 1.8px;


  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}
 &.dark-mode{
  --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
 }
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;

 
}

body {
  
  font-family:"PT Sans Caption", sans-serif;
  color: var(--color-grey-700);
  transition: color 0.3s, background-color 0.3s;
  /* min-height: 100vh; */
  line-height: 1.5;
  font-size: 1.6rem;
  /* color: var(--color-beige-700); */
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
/* button:has(svg) {
  line-height: 0;
} */

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

.width-zero{
  width: 0;
}
.width-full{
  width: 100vw;
}
.span-after{
  width: 0;
  height: 3px;
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-brand-500);
  transition: 0.5s;
}
.half-opacity{
  opacity: 0.5;
}
@keyframes grow {
  from{
    min-height: 0;
  }
  to{
    min-height: 40rem;
  }
}
@keyframes show {
  from{
    height: 0
  }
  to{
    height:11rem;
  }
}
@keyframes disappear {
  from{
    min-height: 40rem;

  }
  to{
    min-height: 0;
    height: 0;
  }
}
@keyframes shake {
  from{
    left: 0;
  }
  to{
    left: 5px;
  }
}
@keyframes fadeInOut {
  0%{
    opacity: 0.3;

  }
  20%{
    opacity: 1;
  }
  80%{
    opacity: 1;
  }
  90%{
    opacity: 0.3;
  }
  100%{
    opacity: 0.3;
  }
}
/* @keyframes moveOutLeft {
  0%{
    transform: translateX(-100%);
  }
  95%{
   transform: translateX(0)
  }
 100%{
  transform: translateX(-100%);
 }
}
.animate-move-out-left{
  animation: moveOutLeft 0.5s  ease forwards;
} */
 @keyframes  pulse {
          0% {
            opacity: 0.3
          }
          50% { opacity: 0.9 }
          80% { opacity: 0.5 }
          100% { opacity: 0.3 }
        }
.animate-pulse {
  animation:pulse 1s linear alternate infinite 
}
.animate-pulse2{ animation:pulse 1s  linear 0.2s alternate  infinite}
.animate-pulse4 {animation:pulse 1s  linear 0.4s alternate infinite}
.animate-grow{
  animation: grow 0.3s  linear forwards;
}
.animate-disappear{
  animation: disappear 0.3s  linear forwards;
}
.fade-in-out{
  animation: fadeInOut 5s linear forwards;
}
.animate-show{
  animation: show 0.1s ease forwards;
}
/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;
export default GlobalStyles;
