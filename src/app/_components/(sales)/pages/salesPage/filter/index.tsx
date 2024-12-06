"use client";

import SelectBox, { CategoryType } from "@/app/_components/common/selectBox";
import S from "./styles.module.scss";
import Input from "@/app/_components/common/input";
import Calendar from "@/app/_components/common/calender";
import Button from "@/app/_components/common/button";

interface FilterProps {
  filter: {
    eventName: string | null;
    kioskMachineId: string | null;
    status: string | null;
    started: Date | null;
    ended: Date | null;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      eventName: string | null;
      kioskMachineId: string | null;
      status: string | null;
      started: Date | null;
      ended: Date | null;
    }>
  >;
  onSubmit: () => void;
  kioskMachineIdOption: CategoryType[];
  statusOption: CategoryType[];
}

const Filter = ({
  filter,
  setFilter,
  onSubmit,
  kioskMachineIdOption,
  statusOption,
}: FilterProps) => {
  return (
    <form className={S["filter"]}>
      <div className={S["filter-row"]}>
        <div className={`${S["filter-column"]} ${S["grow"]}`}>
          <div className={`${S["filter-wrap"]} ${S["grow"]}`}>
            <p className={S["filter-label"]}>이벤트명</p>
            <Input
              placeholder="이벤트 명을 입력하세요."
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  eventName: e.target.value,
                }))
              }
            />
          </div>
          <div className={`${S["filter-wrap"]} ${S["grow"]}`}>
            <p className={S["filter-label"]}>결제 일자</p>
            <div className={S["filter-input-period"]}>
              <Calendar
                date={filter.started}
                maxDate={filter.ended || new Date()}
                setDate={(started) =>
                  setFilter((prev) => ({
                    ...prev,
                    started,
                  }))
                }
                placeholder="0000-00-00"
              />
              <span>-</span>
              <Calendar
                date={filter.ended}
                minDate={filter.started || undefined}
                setDate={(ended) =>
                  setFilter((prev) => ({
                    ...prev,
                    ended,
                  }))
                }
                placeholder="0000-00-00"
              />
            </div>
          </div>
        </div>
        <div className={S["filter-column"]}>
          <div className={S["filter-wrap"]}>
            <p className={S["filter-label"]}>기기명</p>
            <SelectBox
              options={kioskMachineIdOption}
              placeholder="전체"
              customContainerClassName={S["filter-select-target"]}
              selectedCategory={kioskMachineIdOption.find(
                (item) => item.id === filter.kioskMachineId
              )}
              onClick={(cate) =>
                setFilter((prev) => ({
                  ...prev,
                  kioskMachineId: cate.id as string,
                }))
              }
            />
          </div>

          <div className={S["filter-wrap"]}>
            <p className={S["filter-label"]}>상태</p>
            <SelectBox
              options={statusOption}
              placeholder="전체"
              customContainerClassName={S["filter-select-target"]}
              selectedCategory={statusOption.find(
                (item) => item.id === filter.status
              )}
              onClick={(cate) =>
                setFilter((prev) => ({
                  ...prev,
                  status: cate.id as string,
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className={S["handler"]}>
        <Button
          text="초기화"
          type="LINE"
          customClass={S["handler-submit"]}
          onClick={(e) => {
            e.preventDefault();
            setFilter({
              eventName: null,
              kioskMachineId: null,
              status: null,
              started: null,
              ended: null,
            });
          }}
        />
        <Button
          text="검색"
          submit
          customClass={S["handler-submit"]}
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default Filter;
