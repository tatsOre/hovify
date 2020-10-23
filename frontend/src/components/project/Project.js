import React from 'react';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

export default function Project(props) {
    const {project, errors, register, project_id, onRemoveProject} = props;

    const handleRemoveProject = () => {
      onRemoveProject(project_id);
    };
    return(
      <article className='project-item'>
      <IconButton onClick={handleRemoveProject}
        disableRipple className='icon-button__remove'>
        <HighlightOffIcon
        className='icon-button' fontSize="small"/>
      </IconButton>
      <fieldset className="fieldset-block">
        <div>
          <div>
            <TextField
              className='input middle_width'
              error={errors && errors.Projects && errors.Projects[project_id] && Boolean(errors.Projects[project_id].name)}
              defaultValue={(project && project.name) || ''} type='text'
              label='Project Name:' name={`Projects[${project_id}].name`}
              inputRef={register({ required: true, maxLength: 80 })}
            />
            <TextField
              className='input middle_width'
              error={errors && errors.Projects && errors.Projects[project_id] && Boolean(errors.Projects[project_id].link)}
              defaultValue={(project && project.link) || ''} type='url'
              label='Project URL Link:' name={`Projects[${project_id}].link`}
              inputRef={register({required: true, maxLength: 200 })}
            />
          </div>
        </div>
        <TextField
          multiline fullWidth
          error={errors && errors.Projects && errors.Projects[project_id] && Boolean(errors.Projects[project_id].description)}
          defaultValue={(project && project.description) || ''}
          label='Description:' name={`Projects[${project_id}].description`}
          inputRef={register({required: true})}
        />
      </fieldset>
      </article>
    );
}
