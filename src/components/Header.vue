<template>
  <header>
    <div id="stuck_container">
      <div class="container">
        <div class="row">
          <div class="grid_12">
            <h1>
              <a href="/">
                <img src="/images/logo.png" alt="Your Happy Family">
              </a>
            </h1>
            <div class="menu_block">
              <nav class="horizontal-nav full-width horizontalNav-notprocessed">
                <ul class="sf-menu">
                  <li :class="{ 'current': $route.path === '/' }">
                    <router-link to="/">首页</router-link>
                  </li>
                  <li :class="{ 'current': $route.path === '/works' }">
                    <router-link to="/works">作品展示</router-link>
                  </li>
                  <li :class="{ 'current': $route.path === '/news' }">
                    <router-link to="/news">行业新闻</router-link>
                  </li>
                  <li :class="{ 'current': $route.path === '/contact' }">
                    <router-link to="/contact">联系我们</router-link>
                  </li>
                </ul>
              </nav>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>