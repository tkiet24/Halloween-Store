import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { auth } from './firebase-init.js';

const errorWhenLogIn = {
  'auth/invalid-email': 'Invalid email',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/missing-password': 'Missing password',
  'auth/weak-password': 'Weak password',
  'auth/configuration-not-found': "This account doesn't exist",
};

const register = document.getElementById('register-btn');
if (register != null) {
  register.addEventListener('click', async (e) => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    //   validate user

    try {
      //sucess
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      window.location.href = '../pages/register.html';
    } catch (error) {
      //fail
      if (errorWhenLogIn[error.code] === 'Invalid email') {
        document.getElementById('register-email-err').innerText =
          'Invalid email';
        document.getElementById('register-password-err').innerText = '';
      } else if (errorWhenLogIn[error.code] === 'Missing password') {
        document.getElementById('register-password-err').innerText =
          'Enter your password';
        document.getElementById('register-email-err').innerText = '';
      } else if (errorWhenLogIn[error.code] === 'Weak password') {
        document.getElementById('register-password-err').innerText =
          'Weak password';
        document.getElementById('register-email-err').innerText = '';
      }
      console.log(error.code);
    }
  });
}

const login = document.getElementById('btn');
if (login != null) {
  login.addEventListener('click', async (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //   validate user
    try {
      //sucess
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem('isLogged', true);

      window.location.href = '../home.html';
    } catch (error) {
      //fail
      console.log(error.code);
      if (errorWhenLogIn[error.code] === 'Invalid email') {
        document.getElementById('email-err').innerText = 'Invalid email';
      } else if (errorWhenLogIn[error.code] === 'User not found') {
        document.getElementById('email-err').innerText = 'User not found';
        document.getElementById('password-err').innerText = '';
      } else if (errorWhenLogIn[error.code] == 'Missing password') {
        document.getElementById('password-err').innerText =
          'Please enter password';
        document.getElementById('email-err').innerText = '';
      } else if (errorWhenLogIn[error.code] == "This account doesn't exist") {
        document.getElementById('email-err').innerText =
          "This account doesn't exist";
        document.getElementById('password-err').innerText = '';
      } else {
        document.getElementById('password-err').innerText = 'Wrong password';
      }
    }
  });
}

const body = document.querySelector('body');

function toggleDarkMode() {
  const flag = body.className;
  if (flag === 'light') {
    body.classList.replace('light', 'dark');
  } else {
    body.classList.replace('dark', 'light');
  }
}

window.toggleDarkMode = toggleDarkMode;

const toggle = document.querySelector('.toggle');
if (toggle)
  toggle.addEventListener('click', () => toggle.classList.toggle('active'));

document.getElementById('log-in-wrapper').addEventListener('click', () => {
  window.location.href = '../pages/login.html';
});

document
  .getElementById('registration-wrapper')
  .addEventListener('click', () => {
    window.location.href = '../pages/register.html';
  });

const toTop = document.querySelector('.to-top');

toTop.onclick = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

toTop.onclick = function () {
  window.scrollTo(0, 0);
};
