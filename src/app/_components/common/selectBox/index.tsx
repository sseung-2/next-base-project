"use client";

import React, { useState } from "react";
import S from "./styles.module.scss";
import { SelectboxArrowIcon } from "@icons/index";

/** CategoryType
 * id = data value
 * name = view value
 */
export type CategoryType = {
  id: number | string | null;
  name: string;
};
interface Props {
  options: CategoryType[] | undefined;
  onClick: (cate: CategoryType) => void;
  isDisabled?: boolean;
  selectedCategory?: CategoryType;
  customContainerClassName?: string;
  customSelectClassName?: string;
  customOptionClassName?: string;
  placeholder?: string;
  isError?: boolean;
}
const SelectBox = ({
  isDisabled,
  options,
  selectedCategory,
  onClick,
  customContainerClassName,
  customOptionClassName,
  placeholder = "선택해 주세요",
  isError,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={S["select"]}>
        <div
          className={`${S["select-target"]} ${customContainerClassName}  ${
            isError ? S["error"] : isOpen ? S["open"] : ""
          }`}
          onClick={(e) => {
            if (isDisabled) return;
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }}
        >
          <p className={S["select-target-value"]}>
            {selectedCategory?.name || placeholder}
          </p>
          {!isDisabled && (
            <SelectboxArrowIcon
              width={16}
              height={16}
              className={`${S["select-target-arrow"]} ${isOpen ? S.open : ""}`}
            />
          )}
        </div>
        {isOpen && (
          <>
            <div className={`${S["option"]} ${customOptionClassName || ""}`}>
              <ul className={`${S["option-list"]} ${isOpen ? S.open : ""}`}>
                {!!options &&
                  options.map((item) => {
                    const isSelected = selectedCategory?.id === item.id;
                    return (
                      <li
                        className={`${S["option-list-item"]} ${
                          isSelected ? S.selected : ""
                        }`}
                        key={item.id}
                        data-id={item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          onClick(item);
                        }}
                      >
                        <span>{item.name}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div
              className={S.dimm}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SelectBox;
