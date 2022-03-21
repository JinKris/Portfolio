import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { ProjectContext } from "./ProjectContext";

const ProjectForm = ({
  portfolioOwnerId,
  currentProject,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fromDate: "",
    toDate: "",
  });
  const { projects, setProjects } = useContext(ProjectContext);

  const handleProjectValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (setIsAdding) {
        const userId = portfolioOwnerId;
        await Api.post("project/create", {
          userId,
          title: form.title,
          description: form.description,
          fromDate: form.fromDate,
          toDate: form.toDate,
        })
          .then(setIsAdding(false))
          .then(
            setProjects([
              ...projects,
              {
                userId,
                title: form.title,
                description: form.description,
                fromDate: form.fromDate,
                toDate: form.toDate,
              },
            ])
          );
      } else if (setIsEditing) {
        await Api.put(`projects/${currentProject.id}`, {
          userId: currentProject.userId,
          title: form.title,
          description: form.description,
          fromDate: form.fromDate,
          toDate: form.toDate,
        }).then(setIsEditing(false));
        await Api.get("projectlist", currentProject.userId).then((res) =>
          setProjects(res.data)
        );
        /////////////////////////////////////////////////////////////////////////////
        // const idx = projects.findIndex((item) => item.id === projects.id);
        // const newProjects = [...projects];
        // newProjects[idx] = {
        //   userId: currentProject.userId,
        //   id: currentProject.id,
        //   title: form.title,
        //   description: form.description,
        //   fromDate: form.fromDate,
        //   toDate: form.toDate,
        // };
        // setProjects([...newProjects]);
        /////////////////////////////////////////////////////////////////////////
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={form.title}
          onChange={(e) => handleProjectValue("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={form.description}
          onChange={(e) => handleProjectValue("description", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="시작날짜"
          value={form.fromDate}
          onChange={(e) => handleProjectValue("fromDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicToDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="종료날짜"
          value={form.toDate}
          onChange={(e) => handleProjectValue("toDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setIsAdding(false);
              setIsEditing(false);
            }}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProjectForm;
