import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import "./TaskStyles.css";

import { getTasks, deleteTask, editTaskStatus  } from "../../store/actions/tasksActions";
import { useResize } from "./../../hooks/useResize";
import Header from "../Header/Header";
import TaskForm from "../TaskForm/TaskForm";
import { Card } from "../Card/Card";

function Task() {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const { isPhone } = useResize();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""));
  }, [dispatch, tasksFromWho]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);


  useEffect(() => {
    if (search)
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    else setRenderList(list);
  }, [list, search]);

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleStatus}/>
    ));
  };
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleStatus}/>
      ));
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const handleDelete = (id) => dispatch(deleteTask(id));

  const handleStatus = data => dispatch(editTaskStatus(data))

  if (error) return <div>Hay un error</div>;

  return (
    <>
      <Header />
      <main id="task">
        <TaskForm />
        <div className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksFromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Seleccione una propiedad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? (
              <Skeleton height={90} />
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
              ) : loading ? (
                <Skeleton />
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Task;
