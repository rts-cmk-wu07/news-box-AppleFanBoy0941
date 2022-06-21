import { useContext, useState } from 'react';
import Section from './Section';
import ActiveSectionContext from '../context/ActiveSectionContext';
import PullToRefresh from 'react-simple-pull-to-refresh';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PopUp from '../components/PopUp';

const Sections = ({ data, updater }) => {
	const { sections } = useContext(ActiveSectionContext);
	const sorted = data.sort((a, b) => {
		if (a.section < b.section) {
			return -1;
		}
		if (a.section > b.section) {
			return 1;
		}
		return 0;
	});

	const titles = [...new Set(sorted.map(item => item.section))];
	const filteredTitles = sections.activeSections.filter(title => {
		return titles.includes(title);
	});

	const handleRefresh = () => {
		window.location.reload();
	};

	const [popUp, setPopUp] = useState('');
	const [popUpIsOpen, setPopUpIsOpen] = useState(false);

	const styles = {
		ptr: css`
			text-align: center;

			& .ptr__pull-down--pull-more {
				& div {
					& p {
						padding: 1rem;
					}
				}
			}
		`,
	};

	return (
		<>
			<PullToRefresh onRefresh={handleRefresh} css={styles.ptr}>
				<div>
					{filteredTitles.map((title, index) => (
						<Section
							key={title}
							title={title}
							data={data}
							updater={updater}
							setPopUp={setPopUp}
							setPopUpIsOpen={setPopUpIsOpen}
							id={`section-${index}`}
						/>
					))}
				</div>
			</PullToRefresh>
			<PopUp popUp={popUp} popUpIsOpen={popUpIsOpen} />
		</>
	);
};

export default Sections;
