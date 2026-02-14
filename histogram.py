import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the CSV file
df = pd.read_csv('us-parks_a3.csv')

# Create a figure and axis
plt.figure(figsize=(10, 6))

# Create histogram
sns.histplot(data=df, x='RecreationVisits', bins=10)

# Customize the plot
plt.xlabel('Recreation Visits', fontsize=12)
plt.ylabel('Frequency', fontsize=12)
plt.grid(True, alpha=0.3)

plt.tight_layout()

# Display the plot
plt.show()
