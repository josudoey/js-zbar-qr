RUN:=umask 0022;
ZBar:=$(RUN) cd ZBar;

.PHONY: build
build: ./ZBar/zbar/.libs/libzbar.a
	$(RUN) mkdir -p dist
	$(ZBar) emcc -O1 -I`pwd`/include \
 		../emcc/main.c \
		./zbar/.libs/libzbar.a \
		--js-library ../emcc/library.js \
		--pre-js ../emcc/pre.js \
		--post-js ../emcc/post.js \
		-s ENVIRONMENT=web \
		--closure 1 \
		-s WASM=0 \
		-s MODULARIZE=1 \
		-o ../dist/zbar.js

ZBar/zbar/.libs/libzbar.a: ZBar/Makefile
	$(ZBar) emmake make

ZBar/Makefile: ZBar/configure
	$(ZBar) emconfigure ./configure --enable-codes=qrcode --without-x --without-jpeg --without-imagemagick --without-npapi --without-gtk --without-python --without-qt --without-xshm --disable-video --disable-pthread

ZBar/configure: ZBar
	$(ZBar) sed -i "s/ -Werror//" ./configure.ac
	$(ZBar) autoreconf -i

ZBar:
	$(RUN) git clone https://github.com/ZBar/ZBar ZBar