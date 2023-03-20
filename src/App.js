import React, { useState } from "react";
import "./App.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { ArrowLeft, ArrowRight, Delete } from "@material-ui/icons";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

export default function App() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [nextTaskId, setNextTaskId] = useState(9);

  const [tasks, setTasks] = useState([
    { id: 1, text: "1", step: 0 },
    { id: 2, text: "2", step: 0 },
    { id: 3, text: "3", step: 1 },
    { id: 4, text: "4", step: 2 },
    { id: 5, text: "5", step: 3 },
    { id: 6, text: "6", step: 3 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleMoveRight = () => {
    const updatedTasks = tasks.map((task) =>
      task.step === selectedStep ? { ...task, step: selectedStep + 1 } : task
    );
    setTasks(updatedTasks);
    setSelectedStep(selectedStep + 1);
  };

  const handleMoveLeft = () => {
    const updatedTasks = tasks.map((task) =>
      task.step === selectedStep ? { ...task, step: selectedStep - 1 } : task
    );
    setTasks(updatedTasks);
    setSelectedStep(selectedStep - 1);
  };

  const getTasksForStep = (step) =>
    tasks.filter(
      (task) => task.step === step && task.text.includes(searchQuery)
    );
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: `${tasks.length + 1}`,
      step: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: nextTaskId,
      text: newTaskName,
      step: 0,
    };
    setTasks([...tasks, newTask]);
    setNextTaskId(nextTaskId + 1);
    setIsModalOpen(false);
    setNewTaskName("");
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTransfer = (taskId, newStep) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, step: newStep } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Grid container spacing={2} style={{ height: "100%", margin: "10px" }}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ marginLeft: "500px" }}
          >
            <TextField
              placeholder="Search tasks"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              startIcon={<SearchIcon />}
            />

            <Button
              onClick={() => {
                handleAddTask();
                setIsModalOpen(true);
              }}
              startIcon={<AddIcon />}
            >
              Add Task
            </Button>
          </Box>
        </Grid>
        {steps.map((step, index) => (
          <Grid className="step" item xs={12 / steps.length} key={step}>
            <Card>
              <CardHeader title={step} />
              <CardContent>
                <List>
                  {getTasksForStep(index).map((task) => (
                    <ListItem key={task.id}>
                      {index > 0 && (
                        <ListItemIcon>
                          <Delete
                            style={{ color: "red" }}
                            onClick={() => handleDelete(task.id)}
                          />
                          <Button
                            disabled={selectedStep === 0}
                            // onClick={handleMoveLeft}
                            onClick={() =>
                              handleTransfer(task.id, task.step - 1)
                            }
                            startIcon={<ArrowLeft />}
                          />
                          {(<ArrowLeft />)[selectedStep - 1]}
                        </ListItemIcon>
                      )}
                      <ListItemText primary={task.text} />
                      {index < steps.length - 1 && (
                        <ListItemIcon>
                          <Button
                            disabled={selectedStep === steps.length - 1}
                            //onClick={handleMoveRight}
                            onClick={() =>
                              handleTransfer(task.id, task.step + 1)
                            }
                            endIcon={<ArrowRight />}
                          />
                          {(<ArrowRight />)[selectedStep + 1]}
                        </ListItemIcon>
                      )}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ marginLeft: "650px" }}
          >
            <Button
              disabled={selectedStep === 0}
              onClick={handleMoveLeft}
              startIcon={<ArrowLeft />}
            >
              {(<ArrowLeft />)[selectedStep - 1]}
            </Button>
            <Button
              disabled={selectedStep === steps.length - 1}
              onClick={handleMoveRight}
              endIcon={<ArrowRight />}
            >
              {(<ArrowRight />)[selectedStep + 1]}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <div>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            maxWidth="sm"
          >
            <Card>
              <DialogTitle title="Add Task" />
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Task Name"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    margin="normal"
                  />
                  <Button type="submit">Add Task</Button>
                </form>
              </DialogContent>
            </Card>
          </Box>
        </Dialog>
      </div>
    </div>
  );
}
