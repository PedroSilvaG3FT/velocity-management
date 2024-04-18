import authStore from "@/store/auth.store";
import loadingStore from "@/store/loading.store";
import { useCallback, useEffect, useState } from "react";
import { SportWeightControlService } from "@/modules/@shared/firebase/services/sport-weight-control.service";
import { SportTrainingSheetService } from "@/modules/@shared/firebase/services/sport-training-sheet.service";

import {
  ISportWeightControlDB,
  ISportWeightControlItem,
} from "@/modules/@shared/firebase/interfaces/sport-weight-control.interface";
import {
  ISportTrainingSheetDB,
  ISportTrainingSheetItem,
} from "@/modules/@shared/firebase/interfaces/sport-training-sheet.interface";
import WeightControlSummary from "../../components/sport/weight-control/weight-control-summary";
import { SportWeightControlModel } from "@/modules/@shared/firebase/models/sport-weight-control.model";
import { SportTrainingSheetModel } from "@/modules/@shared/firebase/models/sport-training-sheet.model";
import { Separator } from "@/_shad/components/ui/separator";
import TrainingSheetWeek from "../../components/sport/training-sheet/training-sheet-week";
import TrainingSheetList from "../../components/sport/training-sheet/training-sheet-list";

const _sportWeightControlModel = new SportWeightControlModel();
const _sportTrainingSheetModel = new SportTrainingSheetModel();
const _sportWeightControlService = new SportWeightControlService();
const _sportTrainingSheetService = new SportTrainingSheetService();

export default function Sport() {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const [trainingSheets, setTrainingSheets] = useState<
    ISportTrainingSheetItem[]
  >([]);

  const [weightControl, setWeightControl] = useState<ISportWeightControlItem>(
    {} as ISportWeightControlItem
  );

  const [trainingSheet, setTrainingSheet] = useState<ISportTrainingSheetItem>(
    {} as ISportTrainingSheetItem
  );

  const fakeExercice = {
    title: "Fake",
    videoURL: "",
    checked: false,
    series: 0,
    repetitions: 0,
    durationMinutes: 15,
  };
  const fakeTrainingSheet: ISportTrainingSheetItem = {
    id: "",
    user: "",
    title: "Fake",
    active: true,
    description: "Perder peso",
    creationDate: new Date(),
    sunday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    monday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    tuesday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    wednesday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    thursday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    friday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
    saturday: [fakeExercice, fakeExercice, fakeExercice, fakeExercice],
  };

  const getSportTrainingSheet = useCallback(() => {
    _loadingStore.setShow(true);

    _sportTrainingSheetService
      .getByUserId<ISportTrainingSheetDB>(String(_authStore.user.id))
      .then((response) => {
        if (response.length) {
          const data = _sportTrainingSheetModel.buildList(response);

          setTrainingSheets(data);
          setTrainingSheet(data[0]);
        }

        const data = [
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
          fakeTrainingSheet,
        ];

        setTrainingSheets(data);
        setTrainingSheet(data[0]);

        _loadingStore.setShow(false);
      })
      .catch((error) => {
        _loadingStore.setShow(false);
        console.log("error :", error.message);
      });
  }, []);

  const getWeightControl = useCallback(() => {
    _loadingStore.setShow(true);

    _sportWeightControlService
      .getByUserId<ISportWeightControlDB>(String(_authStore.user.id))
      .then((response) => {
        if (response.length) {
          const [data] = response;
          const result = _sportWeightControlModel.buildItem(data);

          setWeightControl(result);
        }
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        _loadingStore.setShow(false);
        console.log("error :", error.message);
      })
      .finally(() => {
        getSportTrainingSheet();
      });
  }, []);

  const handleWeightControlUpdated = (result: ISportWeightControlItem) => {
    setWeightControl(result);
  };

  useEffect(() => {
    getWeightControl();
  }, []);

  return (
    <section>
      <h3 className="font-semibold mb-4">Atividade física </h3>

      <WeightControlSummary
        data={weightControl}
        onDataUpdated={handleWeightControlUpdated}
      />

      <Separator className="my-6" />

      <section className="grid gap-4 grid-cols-[40%_1fr]">
        <TrainingSheetWeek data={trainingSheet} />
        <TrainingSheetList data={trainingSheets} />
      </section>
    </section>
  );
}
