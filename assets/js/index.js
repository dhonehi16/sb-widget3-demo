const DEFAULT_SB_SCRIPT = `(function (e, t, n, o) {
    var enableTesting = undefined ? true : false;
    if (!enableTesting) {
        localStorage.removeItem("SEARCHBOOSTER_V2_AB_TEST_SEGMENT_A");
        localStorage.removeItem("SEARCHBOOSTER_V2_AB_TEST_SEGMENT_B");
    }
    var cdnUrl = "https://cdn.searchbooster.io/scripts/v3/init.js";
    var pathCdnUrl = new URL(cdnUrl).pathname;
    var scriptElement = document.querySelector('[data-sb-init-script]');
    var debug = false;
    var c = cdnUrl;
    var b = 'https://cdn.searchbooster.io' + pathCdnUrl;
    const cart = {
        '54283': 3
    };

    let favourites = {
        '54283': true
    };
    var settings = {
        apiKey: 'b065481e-eb9e-4b91-8394-73e47bec29e9',
        apiUrl: 'https://api.searchbooster.net',
        debug: false,
        locale: 'ru',
        theme: {
            variables: {
                'color-primary': '#3070FA',
                'color-secondary': '#98A2B3',
                'color-text-primary': '#1C1C1C',
                'color-text-secondary': '#727881',
                'font-family-primary': 'Inter, Verdana, Arial, Helvetica, sans-serif',
                'font-family-secondary': 'Roboto, Verdana, Arial, Helvetica, sans-serif',
            },
        },
        layout: {
            // filterPosition: 'top',
            filterPosition: 'left',
            templateOffer: "grid",
            gridColumnCount: 3,
            gridGap: 16,
            rowGap: 24,
            carousel: {
                scrollSpeed: 1000,
                scrollSlideCount: 1
            },
            resultsBreakpoints: {
                0: {
                    columnCount: 2
                },
                1000: {
                    columnCount: 3,
                    gridGap: 10
                },
                1100: {
                    columnCount: 4
                }
            },
        },
        popup: true,
        search: {
            image: true,
            voice: true,
            stateManager: 'hash',
            limit: 36,
            groupCategories: true,
            limitNameChars: 56,
        },
        cartCount: {
            active: true,
            completions: {
                count: false
            },
            offer: {
                count: true
            }
        },
        features: {
            ageCheckPopupType: 'asd'
        },
        dangerousCategoriesIdList: ['295'],
        defaultOpenedFilters: 5,
        offer: {
            mapper: function (offer, data) {
                return offer;
            },
            currency: 'RUB',
            trackClicks: true,
            favourites: {
                pollingRate: 1000,
                items: async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return favourites
                },
                onChange: async ({id, isFavourite}) => {
                    favourites[id] = isFavourite

                    return isFavourite
                }
            },
            cart: {
                active: false,
                pollingRate: 1000,
                label: 'В корзину',
                addToCartConfig: (offer) => {
                    if (!offer.available) {
                        return {
                            label: 'Подробнее',
                            action: () => {
                                window.location.href = offer.url
                            }
                        }
                    }
                },
                items: async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    return cart
                },
                onChangeOfferCount: async (offer) => {
                    if (offer.operationType === 'inc') {
                        cart[offer.id] = offer.currentQuantity + 2
                    } else if (offer.operationType === 'dec') {
                        cart[offer.id] = offer.currentQuantity - 1
                    } else {
                        // await new Promise((resolve) => setTimeout(resolve, 1000))
                        cart[offer.id] = 1
                    }

                    return cart[offer.id]
                }
            },
            errorImg: '',
            layout: {
                row: [
                    {
                        type: 'image',
                        max: 3,
                        errorImg: '',
                        child: [
                            {
                                type: 'favourites',
                                style: {
                                    left: '10px',
                                    top: '10px'
                                },
                            },
                        ],
                    },
                    {
                        type: 'content',
                        child: [
                            {
                                type: 'labels'
                            },
                            {
                                type: 'name',
                                maxLines: 2,
                            },
                            {
                                type: 'additional',
                                value: 'params.inStock',
                                label: 'На складе',
                                visibility(value) {
                                    console.log(value)
                                }
                            },
                            {
                                type: 'reviews'
                            },
                            {
                                type: 'description'
                            }
                        ]
                    },
                    {
                        type: 'info',
                        child: [
                            {
                                type: 'price'
                            },
                            {
                                type: 'cart'
                            }
                        ]
                    }
                ],
                column: [
                    {
                        type: 'image',
                        max: 3,
                        errorImg: '',
                        child: [
                            {
                                type: 'favourites',
                                style: {
                                    top: '10px',
                                    right: '10px'
                                }
                            },
                            {
                                type: 'labels',
                                style: {
                                    left: '6px',
                                    bottom: '6px'
                                }
                            }
                        ]
                    },
                    {
                        type: 'content',
                        child: [
                            {
                                type: 'price'
                            },
                            {
                                type: 'name',
                                maxLines: 2
                            },
                            {
                                type: 'additional',
                                value: 'params.inStock',
                                label: 'На складе:',
                                visibility(value) {
                                    return false
                                },
                                valueFormatter(value) {
                                    return 'asdasd'
                                }
                            },
                            {
                                type: 'reviews'
                            },
                            {
                                type: 'description'
                            }
                        ]
                    },
                    {
                        type: 'info',
                        child: [
                            {
                                type: 'cart'
                            }
                        ]
                    }
                ],
                rowMini: [
                    {
                        type: 'image',
                        max: 3,
                        child: [
                            {
                                type: 'favourites',
                                style: {
                                    left: '11px',
                                    top: '12px'
                                }
                            }
                        ]
                    },
                    {
                        type: 'content',
                        child: [
                            {
                                type: 'name'
                            },
                            {
                                type: 'row',
                                child: [
                                    {
                                        type: 'price',
                                        showOldPrice: false
                                    },
                                    {
                                        type: 'cart',
                                        labelAsCartIcon: true
                                    }
                                ]
                            }
                        ]
                    },
                ],
                columnMini: [
                    {
                        type: 'image',
                        max: 3,
                        errorImg: '',
                        child: [
                            {
                                type: 'favourites',
                                style: {
                                    top: '10px',
                                    right: '10px'
                                }
                            }
                        ]
                    },
                    {
                        type: 'content',
                        child: [
                            {
                                type: 'price'
                            },
                            {
                                type: 'name'
                            }
                        ]
                    },
                    {
                        type: 'info',
                        child: [
                            {
                                type: 'cart'
                            }
                        ]
                    }
                ]
            },
        },
        completionsFullWidth: true,
        completions: {
            active: true,
            skuStrict: true,
            cart: true,
            taps: {
                desktop: {
                    active: true,
                },
                mobile: {
                    active: true
                }
            },
        },
        completionSettings: {
            // orders: ['popular', 'categories', 'brands', 'offers'],
            breakpoints: {
                0: 2,
                500: 2,
                800: 3,
                1000: 4,
            },
            limits: {
                brands: 6,
                offers: 4
            }
        },
        sortVisible: true,
        sortFilters: ['цена', 'категория', 'размер', 'price', 'внешний материал', "category", 'группацвета', 'коллекция'],
        showPopular: true,
        showPopularQueries: true,
        // groupCategories: false,
        // 'additionalSort': {'date': {'ASC': 'Сначала старые', 'DESC': 'Сначала новые', 'param': 'Date'}},

        skuRegExp: /^\\d{9}$/,
        initialized: function (SearchBooster) {
            SearchBooster.mount({
                selector: '#app-input',
                options: {
                    popup: true,
                    // "search":{"groupCategories":false},
                    'additionalSort': {'date': {'ASC': 'Сначала старые', 'DESC': 'Сначала новые', 'param': 'Date'}},
                },
            });
        },
    };
    if (scriptElement) {
        var scriptURL = new URL(scriptElement.src);
        debug = scriptURL.searchParams.get('debug');
    }
    if (typeof sbRegionId !== "undefined" && sbRegionId) {
        settings.regionId = sbRegionId;
    }
    if (typeof sbSegmentId !== "undefined" && sbSegmentId) {
        settings.segmentId = sbSegmentId;
    }
    if (typeof sbUserId !== "undefined" && sbUserId) {
        settings.userId = sbUserId;
    }
    if (debug) {
        settings.debug = true;
    }
    a = t.getElementsByTagName(n)[0];

    function initFu(c, s) {
        if (s) {
            if (s.src === b) {
                s.remove();
                return
            }
            s.remove();
        }
        e[o] = e[o] || function () {
            (e[o].a = e[o].a || []).push(arguments)
        }, e[o].h = c, e[o].n = o, e[o].i = 1 * new Date;
        s = t.createElement(n);
        s.async = 1;
        s.src = c;
        a.parentNode.insertBefore(s, a);
        t.body.insertAdjacentHTML('beforeend', '');

        function loadScriptFromCDN(s) {
            s.onerror = function () {
                initFu(b, s);
            };
            searchbooster(settings);
        }

        loadScriptFromCDN(s)
    }

    initFu(c);
})(window, document, "script", "searchbooster");`

const SB_SCRIPT_NAME = 'sb-script'

function createScript() {
    let script = localStorage.getItem(SB_SCRIPT_NAME)

    if (!script) {
        localStorage.setItem(SB_SCRIPT_NAME, DEFAULT_SB_SCRIPT)
        script = DEFAULT_SB_SCRIPT
    }

    const scriptEl = document.createElement('script')
    scriptEl.innerHTML = script

    console.log(scriptEl)

    document.body.appendChild(scriptEl)
}

function onSave() {
    const script = window.editor.getValue();
    localStorage.setItem(SB_SCRIPT_NAME, script);

    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    createScript();

    document.querySelector('.app-btn').addEventListener('click', onSave)
})
