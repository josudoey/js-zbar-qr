// Simple application to bind zbar with JavaScript/emscripten
// Copyright (C) 2013 Yury Delendik
#include <stdlib.h>
#include <stdio.h>
#include <zbar.h>
#include <emscripten.h>

extern void js_emit_type(const char *symbolName, const char *addonName);
extern void js_emit_data(const char *data);
extern void js_emit_loc(int x, int y);

zbar_processor_t *processor;
int main(int argc, const char *argv[])
{
    processor = zbar_processor_create(0);
    zbar_processor_init(processor, NULL, 0);
    return 0;
}

EMSCRIPTEN_KEEPALIVE
int Process(const void *data, size_t len, int width, int height)
{
    zbar_image_t *zimage = zbar_image_create();
    zbar_image_set_format(zimage, *(unsigned long *)"Y800");
    zbar_image_set_size(zimage, width, height);
    size_t size = width * height;
    zbar_image_set_data(zimage, data, size, zbar_image_free_data);
    zbar_process_image(processor, zimage);

    // ref https://github.com/ZBar/ZBar/blob/master/examples/processor.c
    const zbar_symbol_t *symbol = zbar_image_first_symbol(zimage);
    for (; symbol; symbol = zbar_symbol_next(symbol))
    {
        zbar_symbol_type_t typ = zbar_symbol_get_type(symbol);
        if (typ == ZBAR_PARTIAL)
            continue;
        js_emit_type(zbar_get_symbol_name(typ), zbar_get_addon_name(typ));
        js_emit_data(zbar_symbol_get_data(symbol));
        int loc_size = zbar_symbol_get_loc_size(symbol);
        int i;
        for (i = 0; i < loc_size; i++)
        {
            int x = zbar_symbol_get_loc_x(symbol, i);
            int y = zbar_symbol_get_loc_y(symbol, i);
            js_emit_loc(x, y);
        }
    }
    return 0;
}
