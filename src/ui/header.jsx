import { animated } from '@react-spring/web';
import styled from 'styled-components';
import { MdArrowDropDown, MdArrowDropUp, MdMenu } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import useCurrentUser from '../hooks/useCurrentUser';
import Button from './button';

import useLogout from '../hooks/useLogOut';
import Avatar from './avatar';
import SpinnerMini from './spinnerMini';
import Stack from './stack';
import useWindowWidth from '../hooks/useWindowWidth';

const links = [
  { text: 'Home', path: '/' },
  { text: 'Artworks', path: '/artworks' },
  { text: 'User', path: '/user' },
  { text: 'Cart', path: '/cart' },
];
const StyledHeader = styled.header`
  background-color: var(--color-beige-300);
  padding: 1rem 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 500px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media screen and (min-width: 769px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
export const StyledLogo = styled.p`
  font-size: var(--font-xl);
  font-family: 'Updock', cursive;
  font-weight: 600;
  font-style: normal;
  color: var(--color-beige-700);
`;
const StyledOpenButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
    color: var(--color-brand-700);
  }
`;
const StyledCloseButton = styled.button`
  /* className="absolute border-none outline-none top-4 right-4"; */
  position: absolute;
  top: 1rem;
  right: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
    color: var(--color-brand-700);
  }
`;
const StyledLi = styled.li`
  text-transform: uppercase;
  letter-spacing: 1.5px;

  width: 100%;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-beige-400);
`;
// inline-block w-full h-full uppercase tracking-wider font-semibold
const StyledNavLink = styled(NavLink)`
  display: inline-block;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 400;
`;
const StyledSubMenuLink = styled.div`
  display: flex;
  gap: 1.5rem;
  @media screen and (min-width: 640px) {
    gap: 0rem;
    position: relative;
  }
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 400;
  & button {
    cursor: pointer;
    border: none;
    outline: none;
    /* width: 100%; */
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;
export default function Header() {
  const { windowWidth } = useWindowWidth();
  const userMenuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { isPending, user, isAuthenticated } = useCurrentUser();
  // open state to trigger the animation on mount , unmount
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const activeLink = location.pathname;

  const { mutate, isPending: isLoggingOut, isSuccess } = useLogout();
  // console.log(location.pathname);
  const navRef = useRef(null); // Ref for DOM element

  const handleCloseMenu = () => {
    setOpen(false); // Trigger closing animation
    setTimeout(() => {
      setOpenMenu(false);
    }, 290);
  };
  const handleOpenMenu = () => {
    setOpen(true);

    setOpenMenu(true);
  };

  useEffect(function () {
    function handleClick(e) {
      if (navRef?.current && !navRef.current.contains(e.target)) {
        setOpen(false);
        setTimeout(() => {
          setOpenMenu(false);
        }, 290);
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, []);
  useEffect(function () {
    function handleClick(e) {
      if (userMenuRef?.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, []);
  function handleLogOut() {
    mutate();
  }
  useEffect(
    function () {
      if (!isLoggingOut) setUserMenuOpen(false);
      if (isSuccess) setOpenMenu(false);
    },
    [isLoggingOut, isSuccess]
  );

  return (
    <StyledHeader>
      <StyledLogo>Nada Art</StyledLogo>
      <nav>
        {windowWidth < 640 && (
          <>
            <StyledOpenButton onClick={handleOpenMenu}>
              <MdMenu
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  fontWeight: 'bold',
                }}
              />
            </StyledOpenButton>
            {openMenu && (
              <animated.ul
                ref={navRef}
                className={open ? 'animate-grow' : 'animate-disappear'}
                style={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: 0,

                  overflow: 'hidden',

                  boxShadow: ' var(--shadow-lg)',
                  position: 'absolute',
                  zIndex: 9999,
                  width: '100vw',
                  top: 0,
                  left: 0,
                }}
              >
                <li
                  style={{
                    marginTop: '4rem',
                  }}
                ></li>
                {links.map((link) => (
                  <StyledLi
                    key={link.text}
                    style={
                      {
                        // paddingTop: links.indexOf(link) === 0 ? "4rem" : "",
                      }
                    }
                  >
                    {link.path !== '/user' ? (
                      <StyledNavLink
                        to={link.path}
                        style={{
                          color:
                            activeLink === link.path
                              ? 'var(--color-brand-700)'
                              : '',
                        }}
                        onClick={handleCloseMenu}
                      >
                        {link.text}
                      </StyledNavLink>
                    ) : (
                      <StyledSubMenuLink>
                        {isPending ? (
                          <SpinnerMini />
                        ) : (
                          <NavLink
                            to="/user"
                            onClick={handleCloseMenu}
                            style={{
                              color:
                                activeLink === link.path
                                  ? 'var(--color-brand-700)'
                                  : '',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            You
                          </NavLink>
                        )}

                        <ul
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.2rem',
                            // paddingTop: "1rem",
                            textTransform: 'capitalize',
                          }}
                        >
                          {!user || !isAuthenticated ? (
                            <NavLink to={'/login'} onClick={handleCloseMenu}>
                              <li
                                style={{
                                  fontSize: '90%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.6rem',
                                }}
                              >
                                <IoMdLogIn /> Log in
                              </li>
                            </NavLink>
                          ) : !isLoggingOut ? (
                            <Button
                              style={{ color: 'var(--color-red-700)' }}
                              variation="plainlink"
                              onClick={handleLogOut}
                            >
                              <li
                                style={{
                                  fontSize: '90%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.6rem',
                                }}
                              >
                                <IoMdLogIn /> Log out{' '}
                                <Avatar img={user.user_metadata.avatar} />
                              </li>
                            </Button>
                          ) : (
                            <SpinnerMini />
                          )}
                        </ul>
                      </StyledSubMenuLink>
                    )}
                  </StyledLi>
                ))}
                <StyledCloseButton onClick={handleCloseMenu}>
                  <MdClose
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      fontWeight: 'bold',
                    }}
                  />
                </StyledCloseButton>
                <li
                  style={{
                    marginTop: '2rem',
                    paddingBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <StyledLogo>Nada Art {new Date().getFullYear()}</StyledLogo>
                </li>
              </animated.ul>
            )}
          </>
        )}
        {windowWidth >= 640 && (
          <ul style={{ display: 'flex', gap: '2.3rem' }}>
            {links.map((link) => (
              <li
                key={link.text}
                style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}
              >
                {link.path !== '/user' ? (
                  <StyledNavLink
                    to={link.path}
                    style={{
                      color:
                        activeLink === link.path
                          ? 'var(--color-brand-700)'
                          : '',
                    }}
                  >
                    {link.text}
                  </StyledNavLink>
                ) : (
                  <StyledSubMenuLink>
                    {isPending ? (
                      <SpinnerMini />
                    ) : (
                      <>
                        <NavLink
                          to="/user"
                          onClick={() => setUserMenuOpen(false)}
                          style={{
                            color:
                              activeLink === link.path
                                ? 'var(--color-brand-700)'
                                : '',
                          }}
                        >
                          You{' '}
                        </NavLink>
                        <button
                          onClick={() => setUserMenuOpen((open) => !open)}
                        >
                          {!userMenuOpen ? (
                            <MdArrowDropDown style={{ fontSize: '2.5rem' }} />
                          ) : (
                            <MdArrowDropUp style={{ fontSize: '2.5rem' }} />
                          )}
                        </button>
                        {userMenuOpen ? (
                          <animated.ul
                            className="animate-show"
                            style={{
                              padding: '1.3rem',
                              paddingTop: '2rem',
                              position: 'absolute',
                              top: '45px',
                              borderTop: '1px solid var(--color-beige-500)',
                              overflow: 'hidden',
                              left: '-3.2rem',
                              height: '0',
                              width: '14rem',
                              backgroundColor: 'var(--color-beige-300)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1.2rem',
                              // paddingTop: "1rem",
                              textTransform: 'capitalize',
                            }}
                            ref={userMenuRef}
                          >
                            {!user || !isAuthenticated ? (
                              <>
                                <NavLink
                                  to={'/login'}
                                  onClick={() => setUserMenuOpen(false)}
                                >
                                  <li
                                    style={{
                                      fontSize: '90%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.6rem',
                                    }}
                                  >
                                    <IoMdLogIn /> Log in
                                  </li>
                                </NavLink>
                                <NavLink
                                  to={'/signup'}
                                  onClick={() => setUserMenuOpen(false)}
                                >
                                  <li
                                    style={{
                                      fontSize: '90%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.6rem',
                                    }}
                                  >
                                    <IoMdLogIn /> Sign up
                                  </li>
                                </NavLink>
                              </>
                            ) : !isLoggingOut ? (
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '1rem',
                                  alignItems: 'center',
                                }}
                              >
                                <Avatar img={user.user_metadata.avatar} />
                                <Button
                                  variation="plainlink"
                                  onClick={handleLogOut}
                                  style={{ color: 'var(--color-red-700)' }}
                                >
                                  <li
                                    style={{
                                      fontSize: '90%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.6rem',
                                    }}
                                  >
                                    <IoMdLogOut /> Log Out
                                  </li>
                                </Button>
                              </div>
                            ) : (
                              <Stack direction="horizental">
                                <SpinnerMini />
                                <span>...</span>
                              </Stack>
                            )}
                          </animated.ul>
                        ) : null}
                      </>
                    )}
                  </StyledSubMenuLink>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </StyledHeader>
  );
}
