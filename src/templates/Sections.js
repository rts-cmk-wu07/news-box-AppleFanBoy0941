import { useContext } from 'react';
import Section from './Section';
import ActiveSectionContext from '../context/ActiveSectionContext';
import PullToRefresh from 'react-simple-pull-to-refresh';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';

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

	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}

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
		toast: css`
			width: calc(100vw - 3rem);
			margin: 1.5rem;
			border-radius: 0.5rem;

			& .Toastify__toast {
				border-radius: 0.5rem;
				font-family: 'Inter';
				box-shadow: 0 0.5rem 1.5rem ${v.text_dark}20;
				background: ${v.secondary_1};
				color: ${v.text_1};

				&-icon {
					fill: ${v.primary_1};
				}
			}

			& .Toastify__close-button {
				color: ${v.text_1};
			}

			& .Toastify__progress-bar {
				background: linear-gradient(to right, ${v.primary_1}, ${v.primary_2});
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
							id={`section-${index}`}
						/>
					))}
				</div>
			</PullToRefresh>
			<ToastContainer
				css={styles.toast}
				draggablePercent={50}
				draggableDirection="y"
			/>
		</>
	);
};

export default Sections;
