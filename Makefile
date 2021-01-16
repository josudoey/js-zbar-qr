RUN:=umask 0022;
ZBar:=cd ZBar;

.PHONY: build
build: dist/zbar.js

dist/zbar.js: dist/zbar.emcc.js node_modules
	npm run build:zbar

dist/zbar.emcc.js: ZBar/zbar/.libs/libzbar.a
	mkdir -p dist
	emcc \
		-O1 \
		-IZbar/include \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall"]' \
		-s WASM=0 \
		--no-heap-copy \
		--closure 0 \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s MODULARIZE=0 \
		./Zbar/zbar/.libs/libzbar.a \
		--js-library ./emcc/library.js \
		--pre-js ./emcc/pre.js \
		--post-js ./emcc/post.js \
		./emcc/main.c \
		-o ./dist/zbar.emcc.js

ZBar/zbar/.libs/libzbar.a: ZBar/Makefile
	$(ZBar) emmake make

ZBar/Makefile: ZBar/configure
	$(ZBar) emconfigure ./configure --enable-codes=qrcode --without-x --without-jpeg --without-imagemagick --without-npapi --without-gtk --without-python --without-qt --without-xshm --disable-video --disable-pthread

ZBar/configure: ZBar
	$(ZBar) sed -i "s/ -Werror//" ./configure.ac
	$(ZBar) autoreconf -i

ZBar:
	git clone https://github.com/ZBar/ZBar ZBar

node_modules:
	npm i
