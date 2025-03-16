import React from "react";
import { useTranslation } from "react-i18next";
import "./ScrollingText.css"; // Import the CSS file for scrolling effect

const ScrollingText = () => {
  const { t } = useTranslation();

  const phrases = [
    t("Save_food_save_planet"),
    t("Think_before_throw"),
    t("Waste_less_feed_more"),
    t("Love_food_hate_waste"),
    t("Every_bite_counts"),
    t("Be_smart_waste_apart"),
    t("Eat_take"),
    t("Reduce_food_waste"),
    t("Stop_wasting_start_saving"),
    t("Respect_food_respect_nature"),
    t("plate_it_dont_waste_it"),
    t("Leftovers_are_treasures"),
    t("Plan_smart_waste_apart"),
    t("Food_is_precious"),
    t("Finish_your_plate"),
    t("Waste_less_taste_more"),
    t("Dont_let_good_food_go_bad"),
    t("Shop_wise_store_right"),
    t("Food_is_for_eating"),
    t("Use_it_up_dont_throw_it_out"),
  ];

  return (
    <div className="cursor-default pt-210 mb-20 font-light overflow-hidden whitespace-nowrap py-2">
      <div className="flex animate-scroll">
        {phrases.map((phrase, index) => (
          <div key={index} className="px-6 text-3xl text-teal-900">
            {phrase}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
