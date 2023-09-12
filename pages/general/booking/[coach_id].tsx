import * as React from "react";
import InsideLayout from "~/layouts/InsideLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChooseLesson from "./ChooseLesson";
import LessonOption from "./LessonOption";
import Communication from "./Communication";
import TeacherCard from "./TeacherCard";
import { useRouter } from "next/router";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
import Availability from "./Availability";
import axios from "axios";
import { useQuery } from "react-query";
interface LessonOption {
  lessonID: any;
  lessonType: string;
  lessonPack: number;
}

export default function BookingPage() {
  const [activeStep, setActiveStep] = React.useState("choose");
  const [lessonID, setLessonID] = React.useState<any>("trial");
  const [option, setOption] = React.useState<LessonOption>({
    lessonID: "trial",
    lessonType: "30min",
    lessonPack: 1,
  });
  const [steps, setSteps] = React.useState<string[]>([
    "choose",
    "option",
    "communication",
  ]);
  const [channel, setChannel] = React.useState<any>();

  const curUser = useSelector(selectAuthState);
  const router = useRouter();
  const coachID = router.query.coach_id;

  const { data: coach } = useQuery({
    queryKey: ["getCoach", coachID],
    queryFn: async () => {
      if (coachID) {
        const { data: response } = await axios.post("/api/common/getUser", {
          userID: coachID,
        });
        return response.user;
      }
    },
  });

  React.useEffect(() => {
    if (lessonID != "trial") {
      setSteps(["choose", "option", "schedule", "communication"]);
    } else if (lessonID === "trial") {
      setSteps(["choose", "schedule", "communication"]);
    }
  }, [lessonID]);

  React.useEffect(() => {
    if (option?.lessonPack && option?.lessonPack > 1) {
      setSteps(["choose", "option", "communication"]);
    } else if (
      option?.lessonPack &&
      option?.lessonPack === 1 &&
      lessonID != "trial"
    ) {
      setSteps(["choose", "option", "schedule", "communication"]);
    }
  }, [option]);

  const isLastStep = () => {
    return activeStep === "communication";
  };

  const handleNext = () => {
    isLastStep()
      ? router.push("/test")
      : setActiveStep(steps[steps.indexOf(activeStep) + 1]);
  };

  const handleBack = () => {
    setActiveStep(steps[steps.indexOf(activeStep) - 1]);
  };

  return (
    coach && (
      <InsideLayout>
        <TeacherCard coach={coach} />
        <Box className="mx-auto max-w-2xl lg:max-w-3xl pb-10">
          {activeStep === "choose" ? (
            <ChooseLesson
              curUser={curUser}
              coach={coach}
              sendLessonID={setLessonID}
              selectedLessonID={lessonID}
            />
          ) : null}
          {activeStep === "option" ? (
            <LessonOption
              curUser={curUser}
              coach={coach}
              lessonID={lessonID}
              selectedOption={option}
              sendOption={setOption}
            />
          ) : null}
          {activeStep === "schedule" ? <Availability coach={coach} /> : null}
          {activeStep === "communication" ? (
            <Communication
              coach={coach}
              channel={channel}
              sendChannel={setChannel}
            />
          ) : null}
          <Box
            display={"flex"}
            flexDirection={"row"}
            paddingTop={2}
            justifyContent={"space-between"}
          >
            <Button
              variant="outlined"
              disabled={activeStep === "choose"}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="bg-primary-600 text-white"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </InsideLayout>
    )
  );
}
