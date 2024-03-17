import { useState } from "react";
import GuideService from "services/GuideService";

const Task = (props) => {
  const {
    task,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  let isLoading = false;

  const handleClick = () => {
    // if (!content) return;

    // isLoading = true;
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

  return (
    <article className="w-full bg-[#0D0D0D] rounded-xl lg:rounded-3xl">
      <div
        onClick={handleClick}
        className="flex items-center gap-6 w-full px-10 py-8 hover:bg-[#131313] cursor-pointer rounded-xl lg:rounded-3xl"
      >
        { task.isDone ? (
            <svg className="w-10 h-10 lg:w-auto lg:h-auto" width="24" height="24">
              <use xlinkHref="/assets/icons/sprites.svg#check"></use>
            </svg>
          ) : (
            <div className="w-10 h-10 rounded-full border border-[#7B7B7B]"></div>
          )
        }
        
        <h2 className="text-xl font-bold select-none">{task.title}</h2>
        
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
          "flex flex-col items-center gap-8 p-10",
          isOpen && content ? "flex" : "hidden"
        ].join(" ")}
      >
        <div
          dangerouslySetInnerHTML={{__html: content}}
        ></div>
        <button  className="flex items-center gap-6 rounded-full text-xl">
          { task.isDone ? (
              <svg className="w-10 h-10 lg:w-auto lg:h-auto" width="24" height="24">
                <use xlinkHref="/assets/icons/sprites.svg#check"></use>
              </svg>
            ) : (
              <div className="w-10 h-10 rounded-full border border-[#7B7B7B]"></div>
            )
          } Выполнено
        </button>
      </div>
    </article>
  );
};

export const TaskList = (props) => {
  const {
    tasks,
  } = props;

  return (
    <section className="flex flex-col gap-8 w-full">
      { tasks?.map((task) => {
        return <Task key={task.id} task={task} />
      })}
    </section>
  );
};