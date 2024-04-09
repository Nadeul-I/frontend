<template>
  <div>
    <div class="lump"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppUser",
};
</script>

<style>
.lump {
  height: 91px;
  background-color: black;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: white;
}
.center h1 {
  text-align: center;
  font-size: 30px;
  padding: 0 0 60px 0;
}
.center form {
  padding: 0 40px;
  box-sizing: border-box;
}
form .input {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.input input {
  width: 94%;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background: none;
}

.input label {
  position: absolute;
  top: 40%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  transition: 0.5s;
  z-index: -1;
}

/* */
.input input:focus ~ label,
.input input:valid ~ label,
.input input:disabled ~ label {
  top: -5px;
  color: #2691d9;
}
.input input:focus ~ span::before,
.input input:valid ~ span::before {
  width: 100%;
}
.find {
  color: #a6a6a6;
  cursor: pointer;
}
.find:hover {
  text-decoration: underline;
}
input[type="submit"],
input[type="button"] {
  width: 100%;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}
input[type="submit"] {
  border: 1px solid white;
  background: #2691d9;
  color: #d9f4fb;
}
/* input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
} */
input[type="button"] {
  border: 1px solid white;
  background-color: white;
  color: #2691d9;
}
/* input[type="button"]:hover {
  border-color: #2691d9;
  transition: 0.5s ease;
} */
.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link a {
  color: #2691d9;
  text-decoration: none;
}
/* .signup_link a:hover {
  text-decoration: underline;
} */
</style>
