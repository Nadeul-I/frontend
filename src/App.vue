<template>
  <div id="app">
      <the-header></the-header>
      <router-view/>
  </div>
</template>

<script>
import TheHeader from '@/components/common/TheHeader'
export default ({
  components: {
    TheHeader
  }
})

</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');


/* css 초기화 start */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
a{
  text-decoration: none;
  color:black;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
/* css 초기화 end */


#app {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color: black;
  font-weight: bold;
}

.btn{
    box-shadow:inset 0px 1px 0px 0px #bee2f9;
    background-color:transparent;
    border:1px solid #3866a3;
    display:inline-block;
    cursor:pointer;
    color:#14396a;
    font-family:Arial;
    font-size:15px;
    font-weight:bold;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:0px 1px 0px #7cacde;
}

</style>