import React from 'react';

const SearchHeader = () => {
  return (
    // <header
    //   className="elementor-section elementor-top-section elementor-element elementor-element-79b0ba88 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default animated slideInUp"
    //   data-id="79b0ba88"
    //   data-element_type="section"
    //   data-settings='{"stretch_section":"section-stretched","background_background":"classic","animation":"slideInUp"}'
    //   style={{ width: '808px', left: '-32px' }}
    // >
      <div className="elementor-container elementor-column-gap-default">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-75d7321a"
          data-id="75d7321a"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-795a4934 e-transform e-transform e-transform elementor-widget elementor-widget-hivepress-listing-search-form animated slideInRight"
              data-id="795a4934"
              data-element_type="widget"
              data-settings='{"_animation":"zoomIn","_animation_mobile":"slideInRight","_transform_rotateZ_effect_mobile":{"unit":"px","size":-360,"sizes":[]},"_transform_translateX_effect_mobile":{"unit":"px","size":0,"sizes":[]},"_transform_rotateZ_effect":{"unit":"px","size":"","sizes":[]},"_transform_rotateZ_effect_tablet":{"unit":"px","size":"","sizes":[]},"_transform_translateX_effect":{"unit":"px","size":"","sizes":[]},"_transform_translateX_effect_tablet":{"unit":"px","size":"","sizes":[]},"_transform_translateY_effect":{"unit":"px","size":"","sizes":[]},"_transform_translateY_effect_tablet":{"unit":"px","size":"","sizes":[]},"_transform_translateY_effect_mobile":{"unit":"px","size":"","sizes":[]},"_transform_scaleX_effect":{"unit":"px","size":"","sizes":[]},"_transform_scaleX_effect_tablet":{"unit":"px","size":"","sizes":[]},"_transform_scaleX_effect_mobile":{"unit":"px","size":"","sizes":[]},"_transform_scaleY_effect":{"unit":"px","size":"","sizes":[]},"_transform_scaleY_effect_tablet":{"unit":"px","size":"","sizes":[]},"_transform_scaleY_effect_mobile":{"unit":"px","size":"","sizes":[]}}'
              data-widget_type="hivepress-listing-search-form.default"
            >
              <div className="elementor-widget-container">
                <form
                  className="hp-form--wide hp-form--primary hp-block hp-form hp-form--listing-search"
                  action="https://collegesuvidha.in"
                  method="GET"
                  data-component="form"
                >
                  <div className="hp-form__messages" data-component="messages"></div>
                  <div className="hp-form__fields">
                    <input
                      type="hidden"
                      name="post_type"
                      value="hp_listing"
                      className="hp-field hp-field--hidden"
                    />
                    <select
                      name="_category"
                      className="hp-field hp-field--hidden"
                    >
                      <option value="">All Categories</option>
                      <option value="57">Bag</option>
                      <option value="50">Bicycle</option>
                      <option value="63">Book</option>
                      <option value="52">Calculator</option>
                      <option value="58">Chair</option>
                      <option value="54">Cooler</option>
                      <option value="56">Dumbbell</option>
                      <option value="53">Electric kettle</option>
                      <option value="55">Lab Dress</option>
                      <option value="51">Mattress</option>
                      <option value="62">other</option>
                      <option value="64">Shoes</option>
                    </select>
                    <div className="hp-form__field hp-form__field--search">
                      <input
                        type="search"
                        name="s"
                        value=""
                        placeholder="Keywords"
                        maxLength="256"
                        className="hp-field hp-field--search"
                      />
                    </div>
                  </div>
                  <div className="hp-form__footer">
                    <button
                      type="submit"
                      className="hp-form__button button-primary alt button hp-field hp-field--submit"
                    >
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-2ce58cd4 elementor-widget elementor-widget-heading animated undefined"
              data-id="2ce58cd4"
              data-element_type="widget"
              data-settings='{"_animation_mobile":"slideInLeft"}'
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <style>
                  {`/*! elementor - v3.8.0 - 30-10-2022 */
                    .elementor-heading-title {
                      padding: 0;
                      margin: 0;
                      line-height: 1;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title[class*='elementor-size-']
                      > a {
                      color: inherit;
                      font-size: inherit;
                      line-height: inherit;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title.elementor-size-small {
                      font-size: 15px;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title.elementor-size-medium {
                      font-size: 19px;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title.elementor-size-large {
                      font-size: 29px;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title.elementor-size-xl {
                      font-size: 39px;
                    }
                    .elementor-widget-heading
                      .elementor-heading-title.elementor-size-xxl {
                      font-size: 59px;
                    }`}
                </style>
                <h3 className="elementor-heading-title elementor-size-small">
                  Find everything you need
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </header>
  );
};

export default SearchHeader;
