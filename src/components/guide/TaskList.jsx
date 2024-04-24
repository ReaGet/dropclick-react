import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import GuideService from "services/GuideService";

const Task = (props) => {
  const {
    task,
    guideTitle,
    onPermissionError,
    isFinished
  } = props;

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(task.isDone);

  let isLoading = false;

  const handleClick = (event) => {
    if (event.target.classList.contains("checkbox")) {
      return;
    }

    if (!user?.subscribitions?.length) {
      onPermissionError();
      return;
    }

    if (!content) {
      if (isLoading) {
        return;
      }

      GuideService.getTaskContent({ id: task.id }).then((result) => {
        setContent(result.data);
        setIsOpen(true);
      });

      isLoading = true;
    } else {
      setIsOpen(!isOpen);
    }
  }

  const updateCompletion = () => {
    if (!user?.subscribitions?.length) {
      onPermissionError();
      return;
    }

    GuideService.updateTaskCompletion({
      email: user.email,
      name: guideTitle,
      title: task.title,
    }).then((result) => {
      setIsDone(result.status);
    });
  };

  return (
    <article className="w-full bg-[#0D0D0D] rounded-xl lg:rounded-3xl">
      <div
        onClick={handleClick}
        className="flex items-center gap-6 w-full px-10 py-8 hover:bg-[#131313] cursor-pointer rounded-xl lg:rounded-3xl"
      >
        { !isFinished && (
            isDone ? (
              <svg onClick={updateCompletion} className="checkbox shrink-0 w-10 h-10 lg:w-auto lg:h-auto" width="24" height="24">
                <use xlinkHref="/assets/icons/sprites.svg#check"></use>
              </svg>
            ) : (
              <div onClick={updateCompletion} className="checkbox shrink-0 w-10 h-10 rounded-full border border-[#7B7B7B]"></div>
            )
          )
        }
        
        <h2 className="text-2xl font-bold select-none">{task.title}</h2>
        
        <svg
          className={[
            "ml-auto transition-transform",
            isOpen ? "rotate-180" : ""
          ].join(" ")}
          width="24"
          height="24"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.51209 16.1845C8.8612 16.8353 8.8612 17.8907 9.51209 18.5415L17.6657 26.6872C18.9677 27.9878 21.0774 27.9873 22.3787 26.6862L30.5292 18.5355C31.1802 17.8847 31.1802 16.8293 30.5292 16.1785C29.8784 15.5276 28.8231 15.5276 28.1722 16.1785L21.1962 23.1545C20.5454 23.8055 19.4901 23.8053 18.8392 23.1545L11.8691 16.1845C11.2182 15.5336 10.163 15.5336 9.51209 16.1845Z" fill="white"/>
        </svg>
      </div>

      <div
        className={[
          "task__content flex flex-col items-center gap-8 p-10 text-2xl",
          isOpen && content ? "flex" : "hidden"
        ].join(" ")}
      >
        <div
          dangerouslySetInnerHTML={{__html: content}}
        ></div>
        { !isFinished && <button onClick={updateCompletion} className="flex items-center gap-6 rounded-full text-xl">
          { isDone ? (
              <svg  className="w-10 h-10 lg:w-auto lg:h-auto" width="24" height="24">
                <use xlinkHref="/assets/icons/sprites.svg#check"></use>
              </svg>
            ) : (
              <div className="w-10 h-10 rounded-full border border-[#7B7B7B]"></div>
            )
          } Выполнено
        </button> }
      </div>
    </article>
  );
};

export const TaskList = (props) => {
  const {
    tasks,
    guideTitle,
    onPermissionError,
    isFinished,
  } = props;

  return (
    <section className="flex flex-col gap-8 w-full">
      { tasks?.map((task) => {
        return <Task isFinished={isFinished} key={task.id} task={task} guideTitle={guideTitle} onPermissionError={onPermissionError} />
      })}
    </section>
  );
};