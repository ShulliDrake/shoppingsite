from django_assets import Bundle, register

sass = Bundle('css/shop.scss',
              filters='scss',
              output='sass.css')

all_css = Bundle(
                 sass,
                 filters='cssmin', output="shop-min.css")
register('css_all', all_css)

js = Bundle('js/myshop.js',
            filters='jsmin',
            output='shop-min.js')
register('js_all', js)
