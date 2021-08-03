import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Welcome To Eval-view',
  description: 'Where people deliver quality interview',
  keywords: 'interview, peer-review, video',
};

export default Meta;